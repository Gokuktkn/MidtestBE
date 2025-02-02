import { checkSchema } from "express-validator";
import UsersModel from "../models/users.models.js";
import { validator } from "../utils/validator.js";
import bcrypt from "bcrypt";
import { USER_MESSAGE } from "../constants/messages.js";

export const registerValidator = validator(
    checkSchema(
        {
            email: {
                isEmail: true,
                errorMessage: USER_MESSAGE.YOUR_EMAIL_IS_INVALID,
                custom: {
                    options: async (_, { req }) => {
                        const user = await UsersModel.findOne({ email: req.body.email });
                        if (user) {
                            throw new Error(USER_MESSAGE.USER_IS_ALREADY_EXIST);
                        }
                        return true;
                    },
                },
            },
            password: { trim: true, isLength: { options: { min: 8 } } },
            confirm_password: {
                custom: {
                    options: (value, { req }) => {
                        if (value !== req.body.password) {
                            throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_IS_INVALID);
                        }
                        return true;
                    },
                },
            },
        },
        ["body"]
    )
);

export const loginValidator = validator(
    checkSchema(
      {
        password: {
          trim: true,
          isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters",
          },
          custom: {
            options: async (_, { req }) => {
              const { email, password } = req.body;
              const user = await UsersModel.findOne({ email });
              if (!user) {
                throw new Error(USER_MESSAGE.USER_DOES_NOT_EXIST);
              }
              const hashPassword = user.password;
              const match = await bcrypt.compare(password, hashPassword);
              if (!match) {
                throw new Error(USER_MESSAGE.YOUR_PASSWORD_IS_INVALID);
              }
              req.user = user;
            },
          },
        },
        email: {
          isEmail: true,
          errorMessage: USER_MESSAGE.YOUR_EMAIL_IS_INVALID,
        },
      },
      ["body"]
    )
  );