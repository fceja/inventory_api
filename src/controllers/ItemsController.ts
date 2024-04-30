import { Request, Response } from "express";

import { createItemMidW } from "@middleware/items/CreateItemMidW";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getByItemIdMidW } from "@middleware/items/GetByItemIdMidW";

// CREATE operations
export const createItem = async (req: Request, res: Response) => {
    try {
        const success = await createItemMidW(req.body);
        if (!success) throw new Error("Error creating item.");

        res.status(200).json({ success: true, message: 'OK.' });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// READ operations
export const getByItemId = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params

        const results = await getByItemIdMidW(Number(itemId));
        if (!results) throw new Error("Error getting item node.");

        res.status(200).json({ success: true, item: results });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
