import { Request, Response } from "express";

import { handleUnknownError } from "@utils/ErrorUtils"
import { getAllSystemUsersMidW } from "@middleware/systemUsers/GetAllSystemUsersMidW";

export const getAllSystemUsers = async (req: Request, res: Response) => {
  try {
    const results = await getAllSystemUsersMidW();

    res.status(200).json({ success: true, systemUsers: results });
  } catch (error: unknown) {
    handleUnknownError(error)

    res.status(400).json({ success: false, message: "Bad request." });
  }
};
