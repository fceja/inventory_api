import express from "express";

import * as SystemAuthController from "@controllers/SystemAuthController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const systemAuthRouter = express.Router();

// no auth required
systemAuthRouter.get("/systemLogin", SystemAuthController.systemLogin);

// auth required
systemAuthRouter.use(
  "/testJwt",
  [validateJwtMidW, refreshJwtMidW],
  SystemAuthController.testJwtAuth,
);

export default systemAuthRouter;
