import { Request, Response } from "express";

import { getJwtMidW } from "@middleware/jwt/GetJwtMidW";
import SystemUsersModel from "@db/models/SystemUsersModel";
import { validateSystemUserMidW } from "@middleware/systemUsers/ValidateSystemUserExistsMidW";

export const systemLogin = async (req: Request, res: Response) => {
  try {
    // parse user data from payload body
    const { email, password } = new SystemUsersModel(req.body);

    // verify valid user exists in db
    const storedUser = await validateSystemUserMidW(email, password);
    if (!storedUser) throw Error("User does not exist.");

    // add user data to session
    const { systemUsersId, role } = storedUser;
    req.session.userId = systemUsersId;
    req.session.email = email;
    req.session.userRole = role;

    req.session.token = getJwtMidW(email, systemUsersId);

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
