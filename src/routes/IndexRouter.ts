import express, { Request, Response } from "express";

import { handleUnknownError } from "@utils/ErrorUtils"
import foldersRouter from "@routes/folders/FoldersRouter";
import itemsRouter from "@routes/items/ItemsRouter";
import searchRouter from "@routes/search/SearchRouter";
import systemAuthRouter from "@routes/systemAuth/SystemAuthRouter";
import systemUsersRouter from "@routes/systemUsers/SystemUsersRouter";

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
  } catch (error: unknown) {
    handleUnknownError(error)
  }
});

indexRouter.use("/folders", foldersRouter);
indexRouter.use("/items", itemsRouter);
indexRouter.use("/search", searchRouter);
indexRouter.use("/systemAuth", systemAuthRouter);
indexRouter.use("/systemUsers", systemUsersRouter);

export default indexRouter;
