import jwt from "jsonwebtoken";

import CONFIG_FILE from "@configs/Config";

/**
 *
 * @param {string} email - user email.
 * @param {string} userId - user id.
 *
 *
 * @description
 * - Generates and returns JWT token with an expiry.
 *
 */
export const getJwtMidW = (email: string, userId: string) => {
  const jwtSignPayload = {
    email: email,
    userId: userId,
  };
  const jwtSignOptions = {
    expiresIn: parseInt(CONFIG_FILE.AUTH_JWT_TOKEN_EXPIRY),
  };

  // generate jwt token with expiry
  const jwtToken = jwt.sign(
    jwtSignPayload,
    CONFIG_FILE.AUTH_JWT_SECRET_KEY,
    jwtSignOptions,
  );

  return jwtToken;
};
