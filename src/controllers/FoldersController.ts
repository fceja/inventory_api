import { Request, Response } from "express";

import { handleUnknownError } from "@utils/ErrorUtils"
import { getAggregatedFoldersByFolderIdMidW } from "@middleware/folders/GetAggregatedFoldersByFolderIdMidW"
import { getAggregatedItemsByFolderIdMidW } from "@middleware/folders/GetAggregatedItemsByFolderIdMidW"
import { getAggregatedQuantityByFolderIdMidW } from "@middleware/folders/GetAggregatedQuantitiesByFolderIdMidW"
import { getAggregatedValuesByFolderIdMidW } from "@middleware/folders/GetAggregatedValuesByFolderIdMidW"
import { getInfoByFolderIdMidW } from "@middleware/folders/GetInfoByFolderIdMidW"
import { getNodesByFolderIdMidW } from "@middleware/folders/GetNodesByFolderIdMidW";

// READ operations
export const getNodesByFolderId = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.params

        const infoResults = await getInfoByFolderIdMidW(folderId);
        if (!infoResults || infoResults.length !== 1) throw new Error("Error getting folder.");

        const nodesResults = await getNodesByFolderIdMidW(folderId);
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

        const [folderResults, itemResults, quantityResults, valueResults] = await Promise.all([
            getAggregatedFoldersByFolderIdMidW(folderId),
            getAggregatedItemsByFolderIdMidW(folderId),
            getAggregatedQuantityByFolderIdMidW(folderId),
            getAggregatedValuesByFolderIdMidW(folderId)
        ])
        if (!folderResults) throw new Error("Error getting aggregated folders.");
        if (!itemResults) throw new Error("Error getting aggregated items.");
        if (!quantityResults) throw new Error("Error getting aggregated quantities.");
        if (!valueResults) throw new Error("Error getting aggregated values.");

        const folderData = {
            folderId: Number(folderId),
            folderTotal: Number(folderResults.folderTotal),
            itemTotal: Number(itemResults.itemTotal),
            quantityTotal: Number(quantityResults.quantityTotal),
            valueTotal: Number(valueResults.valueTotal)
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
