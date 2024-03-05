import { Request, Response } from "express";

import { validUserExists } from "@middleware/auth/user/ValidUserExistsMidW";
import UserModel from "@db/models/UserModel";

// login controller
export const Login = async (req: Request, res: Response) => {
  try {
    // parse user data from payload body
    const payloadUserData = new UserModel(req.body);

    const result = await validUserExists(payloadUserData);
    if (!result) throw Error("User does not exist.");

    return res.status(200).json({ message: `TODO - valid user -> ${result}` });
  } catch (error) {
    console.error(error);
    // console.log(error);
    return res.status(401).json({ message: "Not authorized." });
  }
};
