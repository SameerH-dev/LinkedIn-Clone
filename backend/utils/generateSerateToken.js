import createHttpError from "http-errors";
import User from "../models/user.model.js";
import { DotEnvConfig } from "../config/config.js";

export const options = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: "strict",
  secure: DotEnvConfig.nodeEnv === "production",
};

export const generateAccessAndRefereshTokens = async userId => {
  try {
    const user = await User.findById(userId);
    const secretToken = user.generateSecretToken();

    await user.save({ validateBeforeSave: false });

    return { secretToken };
  } catch (error) {
    const errorMessage = createHttpError(500, "Error while generating access and refresh tokens", error);
    throw errorMessage;
  }
};
