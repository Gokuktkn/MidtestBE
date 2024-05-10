import mongoose from "mongoose";
import Collections from "../constants/collection.js";

const interestSchema = new mongoose.Schema(
    {
        email: String,
        interestDesc: String,
    }
);

const InterestsModel = mongoose.model(Collections.INTEREST, interestSchema);
export default InterestsModel;