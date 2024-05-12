import { User } from "../../models/UsersModel.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    const cartData = { 0: 0 };
    await User.insertMany({
      name,
      email,
      password: hashPassword,
      cartData,
    });
    res.json({
      success: true,
      name,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const userSignIn = async (req, res) => {
  const { email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const user = await User.find({ email });
  const userId = user[0]._id;
  const userName = user[0].name;

  const accessToken = jwt.sign(
    {
      userId,
      userName,
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId,
      userName,
      email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  await User.updateOne(
    {
      email,
    },
    {
      $set: {
        refreshToken,
      },
    }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    accessToken,
  });
};

export const userSignOut = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("Cookies: ", refreshToken);

  const checkToken = await User.find({ refreshToken });
  if (!checkToken[0]) {
    return res.sendStatus(204);
  }

  const email = checkToken.email;
  await User.updateOne(
    {
      email,
    },
    {
      $set: {
        refreshToken: null,
      },
    }
  );

  res.clearCookie("refreshToken");
  res.sendStatus(200);
};
