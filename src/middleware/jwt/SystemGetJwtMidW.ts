import jwt from "jsonwebtoken";

import { SystemUserModelI } from "@db/models/SystemUserModel";

// TODO - refactor to consider system and customer
/**
 *
 * @param {SystemUserModelI} storedUser - user data from db.
 *
 * @description
 * - Generates and returns JWT token with an expiry.
 *
 */
export const getJwtMidW = (storedUser: SystemUserModelI) => {
  const { email, systemUserId, role } = storedUser;

  const jwtSignPayload = {
    email: email,
    systemUserId: systemUserId,
    role: role,
  };
  const jwtSignOptions = {
    expiresIn: parseInt(process.env.SYSTEM_JWT_TOKEN_EXPIRY),
  };

  // generate jwt token with expiry
  const jwtToken = jwt.sign(
    jwtSignPayload,
    process.env.SYSTEM_JWT_SECRET_KEY,
    jwtSignOptions,
  );

  return jwtToken;
};
