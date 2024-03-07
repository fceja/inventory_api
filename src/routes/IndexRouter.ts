import express, { Request, Response } from "express";

import systemAuthRouter from "@routes/systemAuth/SystemAuthRouter";
import systemUsersRouter from "@routes/systemUsers/SystemUsersRouter";
import productsRouter from "@routes/products/ProductsRouter";

// init
const indexRouter = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Public endpoint
 *     description: Returns a public message.
 *     responses:
 *       200:
 *         description: A public message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: string
 */
indexRouter.get("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ results: "public - index" });
  } catch (error) {
    console.error(error.message);
  }
});

indexRouter.use("/systemAuth", systemAuthRouter);
indexRouter.use("/systemUsers", systemUsersRouter);
indexRouter.use("/products", productsRouter);

export default indexRouter;
