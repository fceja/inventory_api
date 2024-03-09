import { Request, Response, NextFunction } from "express";

import { getJwtMidW } from "@middleware/jwt/SystemGetJwtMidW";

/**
 *
 * @param {Request} req - Express Request object.
 * @param {Response} _res - Express Response object (not used).
 * @param {NextFunction} next - Express NextFunction for invoking the next middleware.
 *
 * @description
 * - Assigns session JWT token generated from 'getSessionTokenMW' function.
 * - Invokes callback function.
 *
 **/
const refreshJwtMidW = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // apply new jwt token to session
    req.session.systemUser.token = getJwtMidW(
      req.session.systemUser.email,
      req.session.systemUser.systemUserId,
    );

    // pass request to next function
    next();
  } catch (error) {
    console.error(error.message);

    return null;
  }
};

export default refreshJwtMidW;
