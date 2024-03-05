import bcrypt from "bcrypt";
import { Request, Response } from "express";

import dbPool from "@/src/database/DbInit_old";
import NewUserModel from "@models/NewUserModel";
import { UserRepository } from "@database/repositories/UserRepository";

export const createUser = async (req: Request, res: Response) => {
  try {
    // parse user data from payload
    const newUserData = new NewUserModel(req.body);

    // hash user password
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    // init user db repositiory
    const userDbrepo = new UserRepository(dbPool, "_users");

    // create user
    const createdUser = await userDbrepo.createUser(newUserData);

    // update newly created user role to default 'user'
    if (!(await userDbrepo.updateUserRole(createdUser.user_id, "user")))
      throw new Error("Error updating user role");

    return res.status(200).json({ createdUser });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ message: "User error." });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // init user db repo
    const userDbrepo = new UserRepository(dbPool, "_users");

    // retrieve user by userId
    const user = await userDbrepo.getUserByUserId(req.session.userId);
    if (!user) throw new Error("Error getting user");

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    res.status(401).json({ message: "Not authorized" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // init user db repo
    const userDbrepo = new UserRepository(dbPool, "_users");

    // retrieve all records for table
    const users = await userDbrepo.retrieveAllTableRecords();

    // return users;
    res.status(200).json({ "from GET /user/getUsers": users });
  } catch (error) {
    console.error(error);

    res.status(400).json(console.error(error));
  }
};
