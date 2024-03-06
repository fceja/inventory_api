import express, { Request, Response } from "express";

import systemAuthRouter from "@routes/auth/AuthRouter";
import systemUsersRouter from "@routes/systemUsers/SystemUsersRouter";
import productsRouter from "@routes/products/ProductsRouter";

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
    console.error(error);
  }
});

indexRouter.use("/systemAuth", systemAuthRouter);
indexRouter.use("/systemUsers", systemUsersRouter);
indexRouter.use("/products", productsRouter);

export default indexRouter;
