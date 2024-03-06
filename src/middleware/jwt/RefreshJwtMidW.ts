import { Request, Response, NextFunction } from "express";

import { getJwtMidW } from "@middleware/jwt/GetJwtMidW";

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
    // req.session.token = getJwtMidW(req);
    req.session.token = getJwtMidW(req.session.email, req.session.userId);

    // pass request to next function
    next();
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default refreshJwtMidW;
