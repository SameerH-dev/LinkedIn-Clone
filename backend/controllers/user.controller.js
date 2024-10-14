import createHttpError from "http-errors";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const getSuggestedConnections = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id).select("connections");

  const suggestedUser = await User.find({
    _id: {
      $ne: req.user._id,
      $nin: currentUser.connections,
    },
  }).select("username");
});

const getPublicProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Public Profile" });
});

const updateProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update Profile" });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ message: "Get Current User", user: req.user });
  } catch (error) {
    const errorMessage = createHttpError(500, "Error while getting current user", error);
    throw errorMessage;
  }
});

export { getCurrentUser, getSuggestedConnections, getPublicProfile, updateProfile };
