import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { DotEnvConfig } from "../config/config.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const jwtProtectedRoute = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, DotEnvConfig.jwt.webSecret);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized || User not found || Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    const errorMessage = createHttpError(500, "Error while verifying token", error);
    throw errorMessage;
  }
});
