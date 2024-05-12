import { User } from "../models/UsersModel.js";
import { body, check } from "express-validator";
import bcrypt from "bcrypt";

export const signUpValidation = () => {
  return [
    body("name").custom(async (value) => {
      if (value === "") {
        throw new Error("Required Name");
      }
    }),
    body("email").custom(async (value) => {
      if (value === "") {
        throw new Error("Required Email");
      }
      return true;
    }),
    check("email", "Invalid Email format!").isEmail(),
    body("email").custom(async (value) => {
      const emailCheck = await User.find({ email: value });
      if (emailCheck.length !== 0) {
        throw new Error("Email already used!");
      }
    }),
    body("password").custom(async (value) => {
      if (value === "") {
        throw new Error("Require Password");
      }
    }),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must consist of at least 8 characters!"),
    body("confirmPassword").custom((value, { req }) => {
      if (value === "") {
        throw new Error("Required Confirm Password");
      } else if (value !== req.body.password) {
        throw new Error("Confirm Password does'nt match Password!");
      }
      return true;
    }),
  ];
};

export const signInValidation = () => {
  return [
    body("email").custom(async (value) => {
      const user = await User.find({ email: value });
      if (value === "") {
        throw new Error("Required Email");
      } else if (value !== "" && user.length === 0) {
        throw new Error("Email not found");
      }
      return true;
    }),
    body("password").custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      if (user === null || user.length === 0) {
        throw new Error("Required Password");
      }

      const matchPassword = await bcrypt.compare(value, user.password);
      if (!matchPassword) {
        throw new Error("Incorrect password");
      }

      return true;
    }),
  ];
};
