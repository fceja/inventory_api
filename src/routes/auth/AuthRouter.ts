import express from "express";

import * as authController from "@controllers/AuthController";
import { userEmailAndRoleExistsMW } from "@/src/middleware/user/ValidateUserEmailMidW";

const authRouter = express.Router();

// #region - NO AUTH REQ
// POST /auth/login
authRouter.post("/login", [userEmailAndRoleExistsMW], authController.loginAuth);
// #endregion - NO AUTH REQ

export default authRouter;
