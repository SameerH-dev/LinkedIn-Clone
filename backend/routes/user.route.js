import { Router } from "express";
import {
  getCurrentUser,
  getPublicProfile,
  getSuggestedConnections,
  updateProfile,
} from "../controllers/user.controller.js";
import { jwtProtectedRoute } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

// Protected Routes
userRoutes.get("/me", jwtProtectedRoute, getCurrentUser);
userRoutes.get("/suggestions", jwtProtectedRoute, getSuggestedConnections);
userRoutes.get("/:username", jwtProtectedRoute, getPublicProfile);

userRoutes.put("/profile", jwtProtectedRoute, updateProfile);

export default userRoutes;
