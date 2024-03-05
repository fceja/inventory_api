import express from "express";

import * as authController from "@controllers/AuthController";
import { Login } from "@controllers/LoginController";
import { userEmailAndRoleExistsMW } from "@middleware/user/ValidateUserEmailMidW";

const authRouter = express.Router();

// #region - NO AUTH REQ
// POST /auth/login
authRouter.post("/login", [userEmailAndRoleExistsMW], authController.loginAuth);

authRouter.get("/loginV2", Login);
// #endregion - NO AUTH REQ

export default authRouter;
