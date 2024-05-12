import { User } from "../../models/UsersModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("Refresh Cookies: ", refreshToken);

  try {
    const user = await User.find({ refreshToken });
    if (user.length === 0) {
      return res.sendStatus(403);
    }

    const userId = user[0]._id;
    const userName = user[0].name;
    const userEmail = user[0].email;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
          {
            userId,
            userName,
            userEmail,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "300s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
