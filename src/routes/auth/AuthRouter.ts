import express from "express";

import { LoginController } from "@controllers/LoginController";
import { TestJwtAuthController } from "@controllers/TestController";
import refreshJwtMidW from "@middleware/auth/jwt/RefreshJwtMidW";
import validateJwtMidW from "@middleware/auth/jwt/ValidateJwtMidW";

const authRouter = express.Router();

// NO AUTH
authRouter.get("/login", LoginController);

// AUTH
authRouter.use(
  "/testJwt",
  [validateJwtMidW, refreshJwtMidW],
  TestJwtAuthController,
);

export default authRouter;
