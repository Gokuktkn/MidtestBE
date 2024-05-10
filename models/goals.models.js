import mongoose from "mongoose";
import Collections from "../constants/collection.js";

const goalSchema = new mongoose.Schema(
    {
        email: String,
        goalDesc: String,
    }
);

const GoalsModel = mongoose.model(Collections.GOAL, goalSchema);
export default GoalsModel;