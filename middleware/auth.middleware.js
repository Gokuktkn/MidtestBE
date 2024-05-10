import UsersModel from "../models/users.models.js";
import jwt from "jsonwebtoken";
import { USER_MESSAGE } from "../constants/messages.js";

export const authValidator = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error();
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new Error();
        const user = await UsersModel.findOne(req.query);
        if (!user) {
            throw new Error(USER_MESSAGE.USER_DOES_NOT_EXIST);
        }
        next();
    } catch (error) {
        return res.status(401).send({
            message: error.message || "Unauthorized",
        });
    }
};

export const authChangeValidator = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error();
        const token = req.headers.authorization.split(" ")[1];
        if (!token) throw new Error();
        const { email } = req.query;
        const user = await UsersModel.findOne({ email });
        if (!user) {
            throw new Error(USER_MESSAGE.USER_DOES_NOT_EXIST);
        }
        const data = await req.model.findOne({email});
        if(!data) {
            throw new Error(USER_MESSAGE.DATA_EMPTY);
        }
        const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if (decode.email != email) throw new Error();
        next();
    } catch (error) {
        return res.status(401).send({
            message: error.message || "Unauthorized",
        });
    }
};