import createHttpError from "http-errors";
import app from "./app.js";
import { DotEnvConfig } from "./config/config.js";
import connectDB from "./db/connectDB.js";

const startServer = () => {
  const port = DotEnvConfig.port;
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
      });
    })
    .catch(error => {
      const errorMessage = createHttpError(500, error.message);
      console.log(errorMessage);
      process.exit(1);
    });
};

startServer();
