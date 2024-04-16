import { Request, Response } from "express";

import { getByItemIdMidW } from "@middleware/items/GetByItemIdMidW";

// READ operations
export const getByItemId = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params

        const results = await getByItemIdMidW(itemId);
        if (!results) throw new Error("Error getting item node.");

        res.status(200).json({ success: true, item: results });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
