import express from "express";
import * as ProductsController from "@controllers/ProductsController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const productsRouter = express.Router();

productsRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.getProducts,
);

productsRouter.post(
  "/create",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.createProducts,
);

export default productsRouter;
