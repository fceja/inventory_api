import { Request, Response } from "express";

import { getJwtMidW } from "@middleware/jwt/SystemGetJwtMidW";
import SystemLoginUserModel from "@db/models/SystemLoginUserModel";
import SystemStoredUserModel from "@db/models/SystemStoredUserModel";
import { authSystemUserMidW } from "@middleware/systemAuth/AuthSystemUserMidW";

export const systemLogin = async (req: Request, res: Response) => {
  try {
    // parse data from payload body, for user attempting to login with system access
    const { email, password } = new SystemLoginUserModel(req.body);

    // verify a valid system user exists in db
    const storedUser: SystemStoredUserModel = await authSystemUserMidW(
      email,
      password,
    );
    if (!storedUser) throw Error("System user error.");

    // add system user data to session
    addSystemUserInfoToSession(req, storedUser);

    return res
      .status(200)
      .json({ results: `TODO - valid user -> ${storedUser}` });
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ results: "Not authorized." });
  }
};

export const testJwtAuth = (_req: Request, res: Response) => {
  return res.send({
    results: `Jwt is valid`,
  });
};

const addSystemUserInfoToSession = (
  req: Request,
  storedUser: SystemStoredUserModel,
) => {
  req.session.systemUser = {
    systemUsersId: null,
    email: "",
    role: "",
    token: "",
  };

  req.session.systemUser.systemUsersId = storedUser.systemUsersId;
  req.session.systemUser.email = storedUser.email;
  req.session.systemUser.role = storedUser.role;
  req.session.systemUser.token = getJwtMidW(
    storedUser.email,
    storedUser.systemUsersId,
  );
};
