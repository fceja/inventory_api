import { Request, Response } from "express";

import { getJwtMidW } from "@middleware/auth/jwt/GetJwtMidW";
import UserModel from "@db/models/UserModel";
import { validUserExists } from "@middleware/auth/user/ValidUserExistsMidW";

export const login = async (req: Request, res: Response) => {
  try {
    // parse user data from payload body
    const { email, password } = new UserModel(req.body);

    // verify valid user exists in db
    const storedUser = await validUserExists(email, password);
    if (!storedUser) throw Error("User does not exist.");

    // add user data to session
    const { userId, role } = storedUser;
    req.session.userId = userId;
    req.session.email = email;
    req.session.userRole = role;

    req.session.token = getJwtMidW(email, userId);

    return res
      .status(200)
      .json({ message: `TODO - valid user -> ${storedUser}` });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized." });
  }
};

export const testJwtAuth = (_req: Request, res: Response) => {
  return res.send({
    message: `Jwt is valid`,
  });
};
