import express from "express";

import * as ProductsController from "@controllers/ProductsController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";
import validateProductsModel from "@middleware/modelValidation/ValidateProductsModelMidW";

const productsRouter = express.Router();

// CREATE operations
productsRouter.post(
  "/create",
  [validateJwtMidW, refreshJwtMidW, validateProductsModel],
  ProductsController.createProducts,
);

// READ operations
productsRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.getProducts,
);

// UPDATE operations
productsRouter.put(
  "/:productsId",
  [validateJwtMidW, refreshJwtMidW, validateProductsModel],
  ProductsController.updateByProductsId,
);

// DELETE operations
productsRouter.delete(
  "/:productsId",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.deleteByProductsId,
);

export default productsRouter;
