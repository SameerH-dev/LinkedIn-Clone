import { configDotenv as config } from "dotenv";

config({
  path: ".env",
});

const _config = {
  port: process.env.PORT,
  cors: process.env.CORS,
  nodeEnv: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  mongodb: {
    uri: process.env.MONGODB_URI,
    name: process.env.MONGODB_NAME,
  },
  jwt: {
    webSecret: process.env.JWT_WEB_SECRET,
    webSecretExpiresIn: process.env.JWT_WEB_SECRET_EXPIRES_IN,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  mailtrap: {
    mailtrapToken: process.env.MAILTRAP_TOKEN,
    mailtrapEmail: process.env.MAILTRAP_EMAIL,
    mailtrapEmailName: process.env.MAILTRAP_EMAIL_NAME,
  },
};

export const DotEnvConfig = Object.freeze(_config);
