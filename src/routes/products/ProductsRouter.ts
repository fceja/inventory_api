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

export default productsRouter;
