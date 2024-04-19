import { Request, Response } from "express";

import { getNodesByFolderIdMidW } from "@middleware/folders/GetNodesByFolderIdMidW";
import { getInfoByFolderIdMidW } from "@middleware/folders/GetInfoByFolderIdMidW"

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
    } catch (error) {
        console.error(error.message);

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
