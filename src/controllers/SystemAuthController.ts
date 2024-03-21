import { Request, Response } from "express";

import { getJwtMidW } from "@middleware/jwt/SystemGetJwtMidW";
import { authSystemUserMidW } from "@middleware/systemAuth/AuthSystemUserMidW";

export const systemLogin = async (req: Request, res: Response) => {
  try {
    // parse user data from request body
    const { email, password } = req.body;

    // verify a valid system user exists in db
    const storedUser = await authSystemUserMidW(email, password);
    if (!storedUser) throw Error("System user error.");

    // apply jwt token
    res.set("authorization", `Bearer ${getJwtMidW(storedUser)}`);

    return res.status(200).json({ success: true, message: `OK.` });
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({ success: false, message: "Not authorized." });
  }
};

export const testJwtAuth = (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: `OK.`,
  });
};
