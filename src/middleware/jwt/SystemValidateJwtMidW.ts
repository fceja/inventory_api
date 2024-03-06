import assert from "assert";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import CONFIG_FILE from "@configs/Config";

const decodeJwtToken = (req: Request) => {
  try {
    const decodedToken = jwt.verify(
      req.session.systemUser.token,
      CONFIG_FILE.SYSTEM_JWT_SECRET_KEY,
    );

    return decodedToken;
  } catch (error) {
    console.error(error);

    return null;
  }
};

const validateJwt = (
  req: Request,
  decodedJwtToken: string | jwt.JwtPayload,
) => {
  try {
    if (decodedJwtToken instanceof Object) {
      assert(
        decodedJwtToken.userId === req.session.systemUser.systemUsersId,
        "Expected id's to match but did not.",
      );
      assert(
        decodedJwtToken.email === req.session.systemUser.email,
        "Expected emails's to match but did not.",
      );

      return true;
    }

    throw new Error("Invalid jwt");
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction.
 *
 * @returns {Response|NextFunction|void}
 *
 * @description
 * - Decodes and Verifies that the session JWT token is valid.
 *  - If invalid
 *    - {Response} - returns error status.
 *  - If valid
 *    - {NextFunction} - passes request to next middleware function.
 *
 **/
const validateJwtMidW = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | NextFunction | void => {
  try {
    // decode session jwt token
    const decodedJwtToken = decodeJwtToken(req);
    if (!decodedJwtToken) throw new Error("Error decoding.");

    // validate session jwt token
    const isJwtTokenValid = validateJwt(req, decodedJwtToken);
    if (!isJwtTokenValid) throw new Error("Invalid jwt.");

    // jwt is valid, invoke next
    return next();
  } catch (error) {
    console.error(error);

    return res.status(401).send({
      results: "Invalid user",
    });
  }
};

export default validateJwtMidW;
