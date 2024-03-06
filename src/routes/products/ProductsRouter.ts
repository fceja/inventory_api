import express from "express";
import * as ProductsController from "@controllers/ProductsController";
import refreshJwtMidW from "@middleware/jwt/RefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/ValidateJwtMidW";

const productsRouter = express.Router();

productsRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW],
  ProductsController.getProducts,
);

export default productsRouter;
