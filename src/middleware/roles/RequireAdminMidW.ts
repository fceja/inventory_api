import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function requireAdminMidW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // retrieve role from decoded payload
    const jwtToken = (req.headers["authorization"] as string).split(
      "Bearer ",
    )[1];
    const decodedToken = jwt.decode(jwtToken) as { [key: string]: any };
    const role = decodedToken.role;

    // verify user has admin role
    if (!(role === "admin")) {
      throw new Error("User not authorized.");
    }

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).send({ success: false, message: "Not authorized." });
  }
}
