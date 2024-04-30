import { Request, Response } from "express";

import { deleteByProductIdMidW } from "@middleware/products/DeleteByProductIdMidW";
import { handleUnknownError } from "@utils/ErrorUtils"

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
