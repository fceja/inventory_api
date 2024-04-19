import express from "express";

import * as FoldersController from "@controllers/FoldersController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const foldersRouter = express.Router();

// auth required
// READ operations
foldersRouter.get(
  "/:folderId",
  [validateJwtMidW, refreshJwtMidW],
  FoldersController.getNodesByFolderId,
);

export default foldersRouter;
