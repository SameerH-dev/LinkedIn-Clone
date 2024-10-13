import createHttpError from "http-errors";
import { mailtrapClient, sender } from "../utils/mailTrap.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, username, profileUrl) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      subject: "Welcome to LinkedIn Clone",
      html: createWelcomeEmailTemplate(username, profileUrl),
      category: "welcome",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    const errorMessage = createHttpError(500, "Error while sending welcome email in emailHandlers File", error);
    throw errorMessage;
  }
};
