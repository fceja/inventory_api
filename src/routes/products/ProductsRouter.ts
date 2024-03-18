import express from "express";

import * as ProductsController from "@controllers/ProductsController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";
import validateProductsModel from "@middleware/modelValidation/ValidateProductsModelMidW";

const productsRouter = express.Router();

// auth required
// CREATE operations
productsRouter.post(
  "/",
  [validateJwtMidW, refreshJwtMidW, validateProductsModel],
  ProductsController.createProduct,
);

// READ operations
productsRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.getAllProducts,
);

// UPDATE operations
productsRouter.put(
  "/:productId",
  [validateJwtMidW, refreshJwtMidW, validateProductsModel],
  ProductsController.updateByProductId,
);

// DELETE operations
productsRouter.delete(
  "/:productId",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.deleteByProductId,
);

export default productsRouter;
