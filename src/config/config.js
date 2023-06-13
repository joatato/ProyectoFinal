import dotenv from "dotenv";

const environments = ["development", "staging", "production"];
export const currentEnvironment = environments[0];

dotenv.config({
  override: true,
  path: `./src/.env.${currentEnvironment}`,
});

export const config = {
    app: {
        port: process.env.PORT,
        persistence: process.env.PERSISTENCE,
        secretKey: process.env.SECRET_KEY,
    },
    admin: {
        adminMail: process.env.ADMIN_MAIL,
        adminPassword: process.env.ADMIN_PASSWORD,
    },
    database: {
        mongoUrl: process.env.MONGO_URL,
    },
    mail: {
        mailingUser: process.env.MAILING_USER,
        mailingPassword: process.env.MAILING_PASSWORD,
        mailingName: process.env.MAILING_NAME,
        mailingService: process.env.MAILING_SERVICE,
        mailingPort: process.env.MAILING_PORT,
    },
    github: {
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        githubCallbackUrl: process.env.GITHUB_CALLBACK_URL,
    }
}