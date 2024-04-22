import { Request, Response } from "express";

import { handleUnknownError } from "@utils/ErrorUtils"
import { getAggregatedFoldersByFolderIdMidW } from "@middleware/folders/GetAggregatedFoldersByFolderIdMidW"
import { getAggregatedItemsByFolderIdMidW } from "@middleware/folders/GetAggregatedItemsByFolderIdMidW"
import { getAggregatedQuantityByFolderIdMidW } from "@middleware/folders/GetAggregatedQuantitiesByFolderIdMidW"
import { getAggregatedPricesByFolderIdMidW } from "@middleware/folders/GetAggregatedValuesByFolderIdMidW"
import { getContentsByFolderIdMidW } from "@middleware/folders/GetContentsByFolderIdMidW"
import { getNodesByFolderIdMidW } from "@middleware/folders/GetNodesByFolderIdMidW";

// READ operations
export const getNodesByFolderId = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.params

        const infoResults = await getContentsByFolderIdMidW(Number(folderId));
        if (!infoResults || infoResults.length !== 1) throw new Error("Error getting folder.");

        const nodesResults = await getNodesByFolderIdMidW(Number(folderId));
        if (!nodesResults) throw new Error("Error getting folder nodes.");

        res.status(200).json({
            success: true,
            folder: infoResults[0],
            folderNodes: nodesResults
        });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export const getAggregatedDataByFolderId = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.params

        const [folderResults, itemResults, quantityResults, priceResults] = await Promise.all([
            getAggregatedFoldersByFolderIdMidW(folderId),
            getAggregatedItemsByFolderIdMidW(folderId),
            getAggregatedQuantityByFolderIdMidW(folderId),
            getAggregatedPricesByFolderIdMidW(folderId)
        ])
        if (!folderResults) throw new Error("Error getting aggregated folders.");
        if (!itemResults) throw new Error("Error getting aggregated items.");
        if (!quantityResults) throw new Error("Error getting aggregated quantities.");
        if (!priceResults) throw new Error("Error getting aggregated prices.");

        const folderData = {
            folderId: Number(folderId),
            folderTotal: Number(folderResults.folderTotal),
            itemTotal: Number(itemResults.itemTotal),
            quantityTotal: Number(quantityResults.quantityTotal),
            priceTotal: Number(priceResults.priceTotal)
        }

        res.status(200).json({
            success: true,
            folder: folderData
        });
    } catch (error: unknown) {
        handleUnknownError(error)

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
