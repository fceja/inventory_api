import { Request, Response } from "express";

import { getJwtMidW } from "@middleware/jwt/SystemGetJwtMidW";
import SystemLoginUserModel from "@db/models/SystemLoginUserModel";
import { authSystemUserMidW } from "@middleware/systemAuth/AuthSystemUserMidW";
import { SystemStoredUserModelI } from "@db/models/SystemStoredUserModel";

// helper
const addSystemUserInfoToSession = (
  req: Request,
  storedUser: SystemStoredUserModelI,
) => {
  req.session.systemUser = {
    systemUserId: null,
    email: "",
    role: "",
    token: "",
  };

  req.session.systemUser.systemUserId = storedUser.systemUserId;
  req.session.systemUser.email = storedUser.email;
  req.session.systemUser.role = storedUser.role;
  req.session.systemUser.token = getJwtMidW(
    storedUser.email,
    storedUser.systemUserId,
  );
};

export const systemLogin = async (req: Request, res: Response) => {
  try {
    // parse data from payload body, for user attempting to login with system access
    const { email, password } = new SystemLoginUserModel(req.body);

    // verify a valid system user exists in db
    const storedUser = await authSystemUserMidW(email, password);
    if (!storedUser) throw Error("System user error.");

    // add system user data to session
    addSystemUserInfoToSession(req, storedUser);

    return res
      .status(200)
      .json({ success: true, message: `TODO - valid user -> ${storedUser}` });
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({ success: false, message: "Not authorized." });
  }
};

export const testJwtAuth = (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: `Jwt is valid`,
  });
};
