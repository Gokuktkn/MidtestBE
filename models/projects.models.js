import mongoose from "mongoose";
import Collections from "../constants/collection.js";

const projectSchema = new mongoose.Schema(
    {
        email: String,
        projectName: String,
        projectDesc: String,
        role: String,
        startDate: String,
        endDate: String,
    }
);

const ProjectsModel = mongoose.model(Collections.PROJECT, projectSchema);
export default ProjectsModel;