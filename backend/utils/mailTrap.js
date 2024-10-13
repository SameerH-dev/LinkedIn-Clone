import { MailtrapClient } from "mailtrap";
import { DotEnvConfig } from "../config/config.js";

const Token = DotEnvConfig.mailtrap.mailtrapToken;

export const mailtrapClient = new MailtrapClient({
  token: Token,
});

export const sender = {
  email: DotEnvConfig.mailtrap.mailtrapEmail,
  name: DotEnvConfig.mailtrap.mailtrapEmailName,
};
