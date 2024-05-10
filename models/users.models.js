import mongoose from "mongoose";
import Collections from "../constants/collection.js";

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
    }
);

const UsersModel = mongoose.model(Collections.USERS, userSchema);
export default UsersModel;