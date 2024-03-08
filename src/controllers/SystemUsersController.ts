import { Request, Response } from "express";

import { getSystemUsersMidW } from "@middleware/systemUsers/GetSystemUsersMidW";

export const getSystemUsers = async (req: Request, res: Response) => {
  try {
    const results = await getSystemUsersMidW();

    res.status(200).json({ success: true, data: { systemUsers: results } });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ success: false, message: "Bad request." });
  }
};
