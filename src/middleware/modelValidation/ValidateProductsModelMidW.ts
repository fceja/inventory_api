import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// define validation schema for products model props
const ProductsModel = Joi.object({
  // optional string prop
  description: Joi.string().optional(),

  // optional string prop, cannot be empty if provided
  name: Joi.string().optional().required().empty(""),

  // optional numeric prop, cannot be a negative number if provided
  quantity: Joi.number().min(0).optional(),
}).strict();

const validateProductsModel = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error } = ProductsModel.validate(req.body);
    if (error) throw new Error(error.message);

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(400).send({
      success: false,
      message: "Bad Request.",
    });
  }
};

export default validateProductsModel;
