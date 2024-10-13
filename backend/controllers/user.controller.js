import { asyncHandler } from "../utils/asyncHandler.js";

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "Get Current User", user: req.user });
});

export { getCurrentUser };
