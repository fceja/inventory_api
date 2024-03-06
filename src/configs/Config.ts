import dotenv from "dotenv";

dotenv.config();

const CONFIG_FILE = {
  SYSTEM_JWT_SECRET_KEY: process.env.SYSTEM_JWT_SECRET_KEY,
  SYSTEM_JWT_TOKEN_EXPIRY: process.env.SYSTEM_JWT_TOKEN_EXPIRY,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  SERVER_PORT: process.env.SERVER_PORT,
  SESSION_COOKIE_SECRET_KEY: process.env.SESSION_COOKIE_SECRET_KEY,
};
export default CONFIG_FILE;
