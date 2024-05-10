import mongoose from "mongoose";
import Collections from "../constants/collection.js";

const experienceSchema = new mongoose.Schema(
    {
        email: String,
        companyName: String,
        role: String,
        startDate: String,
        endDate: String,
    }
);

const ExperiencesModel = mongoose.model(Collections.EXPERIENCE, experienceSchema);
export default ExperiencesModel;