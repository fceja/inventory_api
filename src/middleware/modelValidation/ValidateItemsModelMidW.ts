import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { handleUnknownError } from "@utils/ErrorUtils"

// define validation schema for items model props
const ItemsModel = Joi.object({
  description: Joi.string().optional(),
  name: Joi.string().optional().required().empty(""),
  parentFolderId: Joi.number().required().integer().positive(),
  price: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),
}).strict();

const validateItemsModel = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error } = ItemsModel.validate(req.body);
    if (error) throw new Error(`Validating error -> ${error.details[0].message}`);

    next();
  } catch (error: unknown) {
    handleUnknownError(error)

    return res.status(400).send({
      success: false,
      message: "Bad Request.",
    });
  }
};

export default validateItemsModel;
