import ExperiencesModel from "../models/experiences.models.js";
import GoalsModel from "../models/goals.models.js";
import InterestsModel from "../models/interests.models.js";
import ProfilesModel from "../models/profiles.models.js";
import ProjectsModel from "../models/projects.models.js";

export const routeCheck = (req, res, next) => {
    const route = req.params.information.trim().toLowerCase();
    switch (route) {
        case "profile":
            req.model = ProfilesModel;
            break;
        case "project":
            req.model = ProjectsModel;
            break;
        case "experience":
            req.model = ExperiencesModel;
            break;
        case "interest":
            req.model = InterestsModel;
            break;
        case "goal":
            req.model = GoalsModel;
            break;
        default:
            return res.status(404).send({
                message: "Page not found",
            })
    }
    next();
};