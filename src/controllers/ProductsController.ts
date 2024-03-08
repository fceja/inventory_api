import { Request, Response } from "express";

import { createProductsMidW } from "@middleware/products/CreateProductsMidW";
import { deleteByProductsIdMidW } from "@middleware/products/DeleteByProductsIdMidW";
import { getProductsMidW } from "@middleware/products/GetProductsMidW";
import { updateByProductsIdMidW } from "@middleware/products/UpdateByProductsIdMidw";

// CREATE operations
export const createProducts = async (req: Request, res: Response) => {
  try {
    const success = await createProductsMidW(req.body);
    if (!success) throw new Error("Error creating.");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// READ operations
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const results = await getProductsMidW();
    if (!results) throw new Error("Error getting.");

    res.status(200).json({ success: true, data: { products: results } });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// UPDATE operations
export const updateByProductsId = async (req: Request, res: Response) => {
  try {
    const success = await updateByProductsIdMidW(
      parseInt(req.params.productsId),
      req.body,
    );
    if (!success) throw new Error("Error updating.");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ success: false, message: "Internal server error." });
  }
};

// DELETE operations
export const deleteByProductsId = async (req: Request, res: Response) => {
  try {
    const { productsId } = req.params;

    const success = await updateByProductsIdMidW(
      parseInt(req.params.productsId),
      req.body,
    );
    if (!success) throw new Error("Error updating.");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ success: false, message: "Internal server error." });
  }
};
