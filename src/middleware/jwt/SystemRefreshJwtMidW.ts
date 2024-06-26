import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { handleUnknownError } from "@utils/ErrorUtils"

/**
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction for invoking the next middleware.
 *
 * @description
 * - Generate and assign new JWT token.
 * - Invokes callback function.
 *
 **/
const refreshJwtMidW = (req: Request, res: Response, next: NextFunction) => {
  try {
    // parse jwt token from request headers
    const oldToken = (req.headers["authorization"] as string).split(
      "Bearer ",
    )[1];

    // verify token signature and expiry
    const decodedToken = jwt.verify(
      oldToken,
      process.env.SYSTEM_JWT_SECRET_KEY,
    ) as jwt.JwtPayload;

    // new expiry
    const exp =
      Math.floor(Date.now() / 1000) +
      parseInt(process.env.SYSTEM_JWT_TOKEN_EXPIRY); // set the new expiration time to be 1 hour from now

    // generate new token with the same payload and the new expiry
    const newToken = jwt.sign(
      { ...decodedToken, exp },
      process.env.SYSTEM_JWT_SECRET_KEY,
    );


    // assign token to response headers
    res.set("authorization", `Bearer ${newToken}`);

    next();
  } catch (error: unknown) {
    handleUnknownError(error)

    return res.status(401).send({ success: false, message: "Unauthorized." });
  }
};

export default refreshJwtMidW;
