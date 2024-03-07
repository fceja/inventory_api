import { Request, Response } from "express";
import Joi from "joi";

import { createProductsMidW } from "@middleware/products/CreateProductsMidW";
import { deleteByProductsIdMidW } from "@middleware/products/DeleteByProductsIdMidW";
import { getProductsMidW } from "@middleware/products/GetProductsMidW";
import { ProductsModelI } from "@models/ProductsModel";
import { updateByProductsIdMidW } from "@middleware/products/UpdateByProductsIdMidw";

// define validation schema for products model props
const ProductsModel = Joi.object({
  // optional string prop
  description: Joi.string().optional(),

  // optional string prop, cannot be empty if provided
  name: Joi.string().optional().required().empty(""),

  // optional numeric prop, cannot be a negative number if provided
  quantity: Joi.number().min(0).optional(),
}).strict();

// CREATE operations
export const createProducts = async (req: Request, res: Response) => {
  try {
    const success = await createProductsMidW(req.body);
    if (!success) throw new Error();

    res.status(200).json({ results: [{ success: success }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ success: false }] });
  }
};

// READ operations
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const results = await getProductsMidW();

    res.status(200).json({ results: [{ products: results }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ success: false }] });
  }
};

// DELETE operations
export const deleteByProductsId = async (req: Request, res: Response) => {
  try {
    const { productsId } = req.params;

    const success = await deleteByProductsIdMidW(Number(productsId));

    res.status(200).json({ results: [{ success: success }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ success: false }] });
  }
};

// UPDATE operations
export const updateByProductsId = async (req: Request, res: Response) => {
  try {
    const { error } = ProductsModel.validate(req.body);
    if (error) throw new Error(error.message);

    const success = await updateByProductsIdMidW(
      parseInt(req.params.productsId),
      req.body,
    );
    if (!success) throw new Error("Error updating.");

    res.status(200).json({ results: [{ success: success }] });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({ results: [{ success: false }] });
  }
};
