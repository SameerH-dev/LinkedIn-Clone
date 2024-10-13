import createHttpError from "http-errors";
import { DotEnvConfig } from "../config/config.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../routes/asyncHandler.js";
import { generateAccessAndRefereshTokens, options } from "../utils/generateSerateToken.js";

const registerController = asyncHandler(async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const newUser = await User.create({
      username,
      fullname,
      email,
      password,
    });

    const { secretToken } = await generateAccessAndRefereshTokens(newUser._id);

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong while registering the user" });
    }

    res.status(201).cookie("token", secretToken, options).json({ message: "User Registered Successfully" });

    //* send Welcome Email to the user
    const profileUrl = DotEnvConfig.clientUrl + "/profile/" + createdUser.username;

    try {
      await sendWelcomeEmail(createdUser.email, createdUser.username, profileUrl);
    } catch (EmailError) {
      const errorMessage = createHttpError(500, "Error while sending welcome email", EmailError);
      throw errorMessage;
    }
  } catch (error) {
    const errorMessage = createHttpError(500, "Error while registering user", error);
    throw errorMessage;
  }
});

const loginController = asyncHandler(async (req, res) => {
  res.json({ message: "Login Controller" });
});

const logoutController = asyncHandler(async (req, res) => {
  res.json({ message: "Logout Controller" });
});

export { loginController, logoutController, registerController };
