import express from "express";

import * as UserController from "@controllers/UserController";
import refreshJwtMidW from "@middleware/auth/jwt/RefreshJwtMidW";
import requireAdminMidW from "@middleware/auth/RequireAdminMidW";
import validateJwtMidW from "@middleware/auth/jwt/ValidateJwtMidW";

const usersRouter = express.Router();

// region - AUTH REQ
// GET
usersRouter.get(
  "/getUsers",
  [validateJwtMidW, refreshJwtMidW, requireAdminMidW],
  UserController.retrieveUsers,
);
// endregion - AUTH REQ

export default usersRouter;
