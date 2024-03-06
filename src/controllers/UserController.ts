import { Request, Response } from "express";

import { getUsers } from "@middleware/user/GetUsersMidW";

export const retrieveUsers = async (req: Request, res: Response) => {
  try {
    // init user db repo
    const results = await getUsers();

    res.status(200).json({ results: results });
  } catch (error) {
    console.error(error);

    res.status(400).json(console.error(error));
  }
};
