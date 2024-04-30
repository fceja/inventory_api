import express from "express";

import * as ItemsController from "@controllers/ItemsController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";
import validateItemsModel from "@middleware/modelValidation/ValidateItemsModelMidW";

const itemsRouter = express.Router();

// auth required
// CREATE operations
itemsRouter.post(
    "/",
    [validateJwtMidW, refreshJwtMidW, validateItemsModel],
    ItemsController.createItem,
);

// READ operations
itemsRouter.get(
    "/",
    [validateJwtMidW, refreshJwtMidW],
    ItemsController.getAllItems,
);

itemsRouter.get(
    "/:itemId",
    [validateJwtMidW, refreshJwtMidW],
    ItemsController.getByItemId,
);

// UPDATE operations
itemsRouter.put(
    "/:itemId",
    [validateJwtMidW, refreshJwtMidW, validateItemsModel],
    ItemsController.updateByItemId,
);

export default itemsRouter;
