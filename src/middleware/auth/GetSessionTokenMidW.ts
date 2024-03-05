import jwt from "jsonwebtoken";
import { Request } from "express";

import CONFIG_FILE from "@configs/Config";

/**
 *
 * @param {Request} req - Express Request object.
 *
 * @returns {string} jwtToken - Generated JWT token.
 *
 * @description
 * - Parse Request object for user data
 * - Generates and returns JWT token with an expiry.
 *
 **/
export const getSessionTokenMidW = (req: Request): string => {
  const jwtSignPayload = {
    email: req.session.email,
    userId: req.session.userId,
  };
  const jwtSignOptions = {
    expiresIn: parseInt(CONFIG_FILE.AUTH_JWT_TOKEN_EXPIRY),
  };

  // generate jwt token with expiry
  const jwtToken = jwt.sign(
    jwtSignPayload,
    CONFIG_FILE.AUTH_JWT_SECRET_KEY,
    jwtSignOptions
  );

  return jwtToken;
};
