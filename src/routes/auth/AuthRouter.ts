import express from "express";

import * as AuthController from "@controllers/AuthController";
import refreshJwtMidW from "@middleware/jwt/RefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/ValidateJwtMidW";

const authRouter = express.Router();

// no auth required
authRouter.get("/login", AuthController.login);

// auth required
authRouter.use(
  "/testJwt",
  [validateJwtMidW, refreshJwtMidW],
  AuthController.testJwtAuth,
);

export default authRouter;
