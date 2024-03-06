import express from "express";

import * as userController from "@controllers/UserController";
// import refreshJwtTokenMidW from "@middleware/auth/RefreshJwtTokenMidW";
import requireAdminMidW from "@middleware/auth/RequireAdminMidW";
import validateJwtMidW from "@middleware/auth/jwt/ValidateJwtMidW";
import { userEmailDoesNotExistMW } from "@middleware/user/ValidateUserEmailMidW";

const usersRouter = express.Router();

// #region - AUTH REQ
// GET
// usersRouter.get(
//   "/getUser",
//   [validateJwtTokenMidW, refreshJwtTokenMidW],
//   userController.getUser
// );
// usersRouter.get(
//   "/getUsers",
//   [requireAdminMidW, validateJwtTokenMidW, refreshJwtTokenMidW],
//   userController.getUsers
// );
// #endregion - AUTH REQ

// #region - NO AUTH REQ
// POST
usersRouter.post(
  "/create",
  [userEmailDoesNotExistMW],
  userController.createUser
);
// #endregion - NO AUTH REQ

export default usersRouter;
