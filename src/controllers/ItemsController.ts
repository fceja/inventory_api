import { Request, Response } from "express";

import { createItemMidW } from "@middleware/items/CreateItemMidW";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getAllItemsMidW } from "@middleware/items/GetAllItemsMidW";
import { getByItemIdMidW } from "@middleware/items/GetByItemIdMidW";
import { updateByItemIdMidW } from "@middleware/items/UpdateByItemIdMidw";

import { deleteByItemIdMidW } from "@middleware/items/DeleteByItemIdMidW";

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

// DELETE operations
export const deleteByItemId = async (req: Request, res: Response) => {
    try {
        const itemId = Number(req.params.itemId)

        const success = await deleteByItemIdMidW(itemId);
        if (!success) throw new Error("Error deleting item.");

        res.status(200).json({ success: true });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};


// READ operations
export const getAllItems = async (_req: Request, res: Response) => {
    try {
        const results = await getAllItemsMidW();
        if (!results) throw new Error("Error getting items.");

        res.status(200).json({ success: true, items: results });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

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

// UPDATE operations
export const updateByItemId = async (req: Request, res: Response) => {
    try {
        const success = await updateByItemIdMidW(
            parseInt(req.params.itemId),
            req.body,
        );
        if (!success) throw new Error("Error updating item.");

        res.status(200).json({ success: true });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
