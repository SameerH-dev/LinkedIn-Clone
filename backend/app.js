import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { DotEnvConfig } from "./config/config.js";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: DotEnvConfig.cors,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "50mb",
  }),
);
app.use(cookieParser());

// * Import Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

export default app;
