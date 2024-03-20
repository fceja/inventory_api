import express from "express";

import * as SystemAuthController from "@controllers/SystemAuthController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const systemAuthRouter = express.Router();

// no auth required
systemAuthRouter.post("/systemLogin", SystemAuthController.systemLogin);

// auth required
systemAuthRouter.get(
  "/testJwt",
  [validateJwtMidW, refreshJwtMidW],
  SystemAuthController.testJwtAuth,
);

export default systemAuthRouter;
