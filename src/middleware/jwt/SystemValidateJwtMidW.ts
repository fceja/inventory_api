import { NextFunction, Request, Response } from "express";
import jwt, { Algorithm } from "jsonwebtoken";

import { handleUnknownError } from "@utils/ErrorUtils"

// helper
const decodeAndValidate = (jwtToken: string) => {
  const decodedToken = jwt.decode(jwtToken, { complete: true });

  // verify signature and expiry
  try {
    jwt.verify(jwtToken, process.env.SYSTEM_JWT_SECRET_KEY, {
      algorithms: [decodedToken.header.alg as Algorithm],
    });

    return true;
  } catch (error: unknown) {
    handleUnknownError(error)

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
 * - Decodes and verifies JWT token is valid.
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
    // parse jwt token from request headers
    const jwtToken = (req.headers["authorization"] as string).split(
      "Bearer ",
    )[1];
    if (!jwtToken) {
      throw new Error("Jwt token does not exist.");
    }

    // decode and validate jwt token
    const valid = decodeAndValidate(jwtToken);
    if (!valid) throw new Error("Invalid jwt token.");

    return next();
  } catch (error: unknown) {
    handleUnknownError(error)

    return res.status(401).send({ success: false, message: "Unauthorized." });
  }
};

export default validateJwtMidW;
