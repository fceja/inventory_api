import express from "express";

import * as UserController from "@controllers/UserController";
import refreshJwtMidW from "@middleware/jwt/RefreshJwtMidW";
import requireAdminMidW from "@middleware/role/RequireAdminMidW";
import validateJwtMidW from "@middleware/jwt/ValidateJwtMidW";

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
