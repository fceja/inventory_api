import { Request, Response } from "express";

import { getAllSystemUsersMidW } from "@middleware/systemUsers/GetAllSystemUsersMidW";

export const getAllSystemUsers = async (req: Request, res: Response) => {
  try {
    const results = await getAllSystemUsersMidW();

    res.status(200).json({ success: true, systemUsers: results });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ success: false, message: "Bad request." });
  }
};
