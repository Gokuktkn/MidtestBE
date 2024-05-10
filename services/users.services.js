import UsersModel from "../models/users.models.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import { config } from "dotenv";
import ProfilesModel from "../models/profiles.models.js";
config();

class UserService {
  async register(email, password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    await UsersModel.create({ email, password: hashPassword });
  }
  async login(userEmail) {
    const access_token = await signToken({
      payload: {
        email: userEmail,
      },
      privateKey: process.env.JWT_PRIVATE_KEY,
    });
    return access_token;
  }
  async getData(model, email) {
    const profile = await model.find({ email });
    return profile;
  }
  async createData(model, data) {
    await model.create(data);
  }
  async updateData(model, email, updateData) {
    await model.updateOne({ email }, { $set: updateData });
  }
  async deleteData(model, email) {
    await model.deleteOne({ email });
  }
}

const userService = new UserService();

export default userService;