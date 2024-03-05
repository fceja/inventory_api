import express from "express";

import { Login } from "@controllers/LoginController";

const authRouter = express.Router();

// NO AUTH
authRouter.get("/login", Login);

export default authRouter;
