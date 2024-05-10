import { Router } from "express";
import { loginValidator, registerValidator } from "../middleware/users.middleware.js";
import { deleteController, getMeController, loginController, createController, registerController, updateController } from "../controllers/users.controller.js";
import { authChangeValidator, authValidator } from "../middleware/auth.middleware.js";
import { routeCheck } from "../middleware/route.middleware.js";

const userRoute = Router();

userRoute.post("/register", registerValidator, registerController);
userRoute.post("/login", loginValidator, loginController);
userRoute.post("/:information", routeCheck, authValidator, createController);
userRoute.put("/:information", routeCheck, authChangeValidator, updateController);
userRoute.delete("/:information", routeCheck, authChangeValidator, deleteController);
userRoute.get("/:information", routeCheck, authValidator, getMeController);

export default userRoute;