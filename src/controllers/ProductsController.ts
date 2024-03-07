import { Request, Response } from "express";

import { createProductsMidW } from "@middleware/products/CreateProductsMidW";
import { getProductsMidW } from "@middleware/products/GetProductsMidW";

// CREATE operations
export const createProducts = async (req: Request, res: Response) => {
  try {
    const success = await createProductsMidW(req.body);
    if (!success) throw new Error();

    res.status(200).json({ results: [{ status: true }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ status: false }] });
  }
};

// READ operations
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const results = await getProductsMidW();

    res.status(200).json({ results: [{ products: results }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ status: false }] });
  }
};
