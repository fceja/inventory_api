import { Request, Response } from "express";

import { getSystemUsersMidW } from "@middleware/systemUsers/GetSystemUsersMidW";

export const getSystemUsers = async (req: Request, res: Response) => {
  try {
    // init user db repo
    const results = await getSystemUsersMidW();

    res.status(200).json({ results: [{ systemUsers: results }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ status: false }] });
  }
};
