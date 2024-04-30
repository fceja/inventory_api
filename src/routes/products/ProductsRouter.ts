import express from "express";

import * as ProductsController from "@controllers/ProductsController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";
import validateItemsModel from "@middleware/modelValidation/ValidateItemsModelMidW";

const productsRouter = express.Router();

// auth required
// READ operations
productsRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.getAllProducts,
);

// UPDATE operations
productsRouter.put(
  "/:productId",
  [validateJwtMidW, refreshJwtMidW, validateItemsModel],
  ProductsController.updateByProductId,
);

// DELETE operations
productsRouter.delete(
  "/:productId",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.deleteByProductId,
);

export default productsRouter;
