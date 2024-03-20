import { Request, Response } from "express";

import { createProductMidW } from "@middleware/products/CreateProductMidW";
import { deleteByProductIdMidW } from "@middleware/products/DeleteByProductIdMidW";
import { getAllProductsMidW } from "@middleware/products/GetAllProductsMidW";
import { updateByProductIdMidW } from "@middleware/products/UpdateByProductIdMidw";

// CREATE operations
export const createProduct = async (req: Request, res: Response) => {
  try {
    const success = await createProductMidW(req.body);
    if (!success) throw new Error("Error creating product.");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// READ operations
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const results = await getAllProductsMidW();
    if (!results) throw new Error("Error getting products.");

    res.status(200).json({ success: true, products: results });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// UPDATE operations
export const updateByProductId = async (req: Request, res: Response) => {
  try {
    const success = await updateByProductIdMidW(
      parseInt(req.params.productId),
      req.body,
    );
    if (!success) throw new Error("Error updating product.");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// DELETE operations
export const deleteByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const success = await deleteByProductIdMidW(Number(productId));
    if (!success) throw new Error("Error deleting product.");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
