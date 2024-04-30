import { Request, Response } from "express";

import { handleUnknownError } from "@utils/ErrorUtils"
import { FoldersModelI } from "@db/models/FoldersModel";
import { getFoldersContainingNameMidW } from "@middleware/folders/GetFoldersContainingNameMidW";
import { getItemsContainingNameMidW } from "@middleware/items/GetItemsContainingNameMidW";
import { ItemsModelI } from "@db/models/ItemsModel";


// READ operations
export const getAutoCompleteByName = async (req: Request, res: Response) => {
    try {
        const { folderName, itemName } = req.query
        if (!folderName && !itemName) throw new Error('Expected folderName or itemName query param.')

        let results: {
            folders?: FoldersModelI[],
            items?: ItemsModelI[]
        } = {};

        if (folderName) {
            const folderResults: FoldersModelI[] | null = await getFoldersContainingNameMidW(folderName as string);
            if (folderResults) {
                results = { ...results, folders: [...folderResults] };
            }
        }

        if (itemName) {
            const itemResults: ItemsModelI[] = await getItemsContainingNameMidW(itemName as string);
            results = { ...results, items: [...itemResults] };
        }

        res.status(200).json({ success: true, results: results });

    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
