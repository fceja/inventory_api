import { NextFunction, Request, Response } from "express";

export default function requireAdminMidW(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // verify user has admin role
  try {
    if (!(req.session.userRole === "admin")) {
      throw new Error("User not authorized.");
    }

    // user is authorized, pass request to next function
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: "Not authorized." });
  }
}
