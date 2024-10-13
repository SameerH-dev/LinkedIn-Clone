import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "50mb",
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

import authRoutes from "./routes/auth.route.js";

app.use("/api/v1/auth", authRoutes);

export default app;
