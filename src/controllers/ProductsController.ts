import { Request, Response } from "express";

import { getProductsMidW } from "@middleware/products/GetProductsMidW";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const results = await getProductsMidW();

    res.status(200).json({ results: results });
  } catch (error) {
    res.status(400).json(console.error(error));
  }
};
