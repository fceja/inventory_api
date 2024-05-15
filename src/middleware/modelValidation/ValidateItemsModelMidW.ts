import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { handleUnknownError } from "@utils/ErrorUtils"

const ItemsModel = Joi.object({
  cost: Joi.number().min(0).optional().allow(null),
  description: Joi.string().optional(),
  minLevel: Joi.number().min(0).optional().allow(null),
  name: Joi.string().optional().required().empty(""),
  nodeType: Joi.string().required().valid("item"),
  parentFolderId: Joi.number().min(0).optional().allow(null),
  price: Joi.number().min(0).optional().allow(null),
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
