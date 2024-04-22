import express from "express";

import * as SearchController from "@controllers/SearchController";
import refreshJwtMidW from "@middleware/jwt/SystemRefreshJwtMidW";
import validateJwtMidW from "@middleware/jwt/SystemValidateJwtMidW";

const searchRouter = express.Router();

// auth required
// READ operations
searchRouter.get(
    "/autoComplete",
    [validateJwtMidW, refreshJwtMidW],
    SearchController.getAutoCompleteByName,
);

export default searchRouter;
