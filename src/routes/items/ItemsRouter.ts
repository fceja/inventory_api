import express from "express";

import * as ItemsController from "@controllers/ItemsController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const itemsRouter = express.Router();

// auth required
// READ operations
itemsRouter.get(
    "/:itemId",
    [validateJwtMidW, refreshJwtMidW],
    ItemsController.getByItemId,
);

export default itemsRouter;
