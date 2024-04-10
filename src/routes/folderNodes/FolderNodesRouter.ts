import express from "express";

import * as FolderNodesController from "@controllers/FolderNodesController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const folderNodesRouter = express.Router();

// auth required
// READ operations
folderNodesRouter.get(
  "/:folderId",
  [validateJwtMidW, refreshJwtMidW],
  FolderNodesController.getByFolderId,
);

export default folderNodesRouter;
