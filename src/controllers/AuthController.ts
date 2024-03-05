import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { QueryResult } from "pg";

import dbPool from "@db/DbInit_old";
import { getSessionTokenMidW } from "@middleware/auth/GetSessionTokenMidW";
import UserModel from "@db/models/UserModel";
import { UserRepository } from "@db/repositories/UserRepository";

// TODO - verify if needed
// import _SessionData from "@appTypes/express-session/Index";

const parseUserDataToSession = (req: Request, storedUserData: UserModel) => {
  /* NOTE */
  /**
   *
   * - Session data is not saved in the cookie itself.
   * - Only session id is saved in cookie.
   *
   * - Session data is stored server-side.
   *
   **/

  // parse user data into session
  req.session.userId = JSON.parse(JSON.stringify(storedUserData)).user_id;
  req.session.email = JSON.parse(JSON.stringify(storedUserData)).email;
  req.session.userRole = JSON.parse(JSON.stringify(storedUserData)).role;

  // get session jwt token
  req.session.token = getSessionTokenMidW(req);
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    // parse user data from payload
    const payloadUserData = new UserModel(req.body);

    // // init user db repo
    const userDbrepo = new UserRepository(dbPool, "_users");

    // // get user data from db
    const storedUserData: UserModel = await userDbrepo.getUserAndRoleByEmail(
      payloadUserData.email,
    );

    // validate pass is valid
    if (!bcrypt.compareSync(payloadUserData.password, storedUserData.password))
      throw new Error("Login error");

    // parse session data to request object
    parseUserDataToSession(req, storedUserData);

    return res.status(200).json({ message: "Authorized" });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ message: "Not authorized." });
  }
};
