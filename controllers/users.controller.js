import { USER_MESSAGE } from "../constants/messages.js";
import ProfilesModel from "../models/profiles.models.js";
import userService from "../services/users.services.js";

export const registerController = async (req, res, next) => {
  const { email, password } = req.body;
  await userService.register(email, password);
  return res.json({
    message: "Register Successfully",
  });
};

export const loginController = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const access_token = await userService.login(userEmail);
    return res.json({
      message: "Login Successfully",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

export const createController = async (req, res, next) => {
  const { email } = req.query;
  const data = { ...req.body, email };
  await userService.createData(req.model, data);
  return res.json({
    message: "Create Successfully",
  });
};

export const updateController = async (req, res, next) => {
  const { email } = req.query;
  const updateData = req.body;
  await userService.updateData(req.model, email, updateData);
  return res.json({
    message: "Update Successfully",
  });
};

export const deleteController = async (req, res, next) => {
  const { email } = req.query;
  await userService.deleteData(req.model, email);
  return res.json({
    message: "Delete Successfully",
  });
};

export const getMeController = async (req, res, next) => {
  const { email } = req.query;
  const result = await userService.getData(req.model, email);
  return res.json({
    message: USER_MESSAGE.GET_ME_SUCCESSFULLY,
    result,
  });
};