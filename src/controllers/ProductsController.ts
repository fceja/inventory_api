import { Request, Response } from "express";

import { createItemMidW } from "@middleware/items/CreateItemMidW";
import { deleteByProductIdMidW } from "@middleware/products/DeleteByProductIdMidW";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getAllProductsMidW } from "@middleware/products/GetAllProductsMidW";
import { updateByProductIdMidW } from "@middleware/products/UpdateByProductIdMidw";

// READ operations
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const results = await getAllProductsMidW();
    if (!results) throw new Error("Error getting products.");

    res.status(200).json({ success: true, products: results });
  } catch (error: unknown) {
    handleUnknownError(error)

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
  } catch (error: unknown) {
    handleUnknownError(error)

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
  } catch (error: unknown) {
    handleUnknownError(error)

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
