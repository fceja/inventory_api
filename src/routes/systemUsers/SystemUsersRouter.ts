import express from "express";

import * as SystemUsersController from "@controllers/SystemUsersController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import requireAdminMidW from "@middleware/roles/RequireAdminMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const systemUsersRouter = express.Router();

// region - AUTH REQ
// GET
systemUsersRouter.get(
  "/",
  [validateJwtMidW, refreshJwtMidW, requireAdminMidW],
  SystemUsersController.getSystemUsers,
);
// endregion - AUTH REQ

export default systemUsersRouter;
