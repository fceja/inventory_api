import express from "express";

import * as SystemUsersController from "@controllers/SystemUsersController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import requireAdminMidW from "@middleware/roles/RequireAdminMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const systemUsersRouter = express.Router();

// auth required, admin required
systemUsersRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW, requireAdminMidW],
  SystemUsersController.getAllSystemUsers,
);

export default systemUsersRouter;
