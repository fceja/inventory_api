import { Request, Response } from "express";

import { getJwtMidW } from "@middleware/jwt/GetJwtMidW";
import SystemUsersModel from "@db/models/SystemUsersModel";
import { authSystemUserMidW } from "@middleware/systemAuth/AuthSystemUserMidW";

export const systemLogin = async (req: Request, res: Response) => {
  try {
    // parse user data from payload body
    const { email, password } = new SystemUsersModel(req.body);

    // verify valid user exists in db
    const storedUser = await authSystemUserMidW(email, password);
    if (!storedUser) throw Error("User does not exist.");

    // add user data to session
    const { systemUsersId, role } = storedUser;
    req.session.userId = systemUsersId;
    req.session.email = email;
    req.session.userRole = role;

    req.session.token = getJwtMidW(email, systemUsersId);

    return res
      .status(200)
      .json({ results: `TODO - valid user -> ${storedUser}` });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ results: "Not authorized." });
  }
};

export const testJwtAuth = (_req: Request, res: Response) => {
  return res.send({
    results: `Jwt is valid`,
  });
};
