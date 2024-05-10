import mongoose from "mongoose";
import Collections from "../constants/collection.js";

const profileSchema = new mongoose.Schema(
    {
        email: String,
        fullName: String,
        dayOfBirth: String,
        placeOfBirth: String,
        nationality: String,
        educationHistory: String,
    }
);

const ProfilesModel = mongoose.model(Collections.PROFILES, profileSchema);
export default ProfilesModel;