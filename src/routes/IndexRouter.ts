import express, { Request, Response } from "express";

import systemAuthRouter from "@routes/systemAuth/SystemAuthRouter";
import systemUsersRouter from "@routes/systemUsers/SystemUsersRouter";
import productsRouter from "@routes/products/ProductsRouter";
import folderNodesRouter from "@routes/folderNodes/FolderNodesRouter";

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
    res.status(200).json({ success: true, message: "Public endpoint." });
  } catch (error) {
    console.error(error.message);
  }
});

indexRouter.use("/folderNodes", folderNodesRouter);
indexRouter.use("/products", productsRouter);
indexRouter.use("/systemAuth", systemAuthRouter);
indexRouter.use("/systemUsers", systemUsersRouter);

export default indexRouter;
