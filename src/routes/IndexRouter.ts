import express, { Request, Response } from "express";

import authRouter from "@routes/auth/AuthRouter";
import testRouter from "@routes/test/TestRouter";
import userRouter from "@routes/user/UserRouter";

// init
const indexRouter = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Public endpoint
 *     description: Returns a simple message.
 *     responses:
 *       200:
 *         description: A simple message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
indexRouter.get("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "public - index" });
  } catch (error) {
    console.error(error)
  }
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/test", testRouter);
indexRouter.use("/user", userRouter);

export default indexRouter;
