import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { jwtProtectedRoute } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/me", jwtProtectedRoute, getCurrentUser);

export default userRoutes;
