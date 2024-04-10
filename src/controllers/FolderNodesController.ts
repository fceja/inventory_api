import { Request, Response } from "express";

import { getByFolderIdMidW } from "@middleware/nodes/GetFolderNodesMidW";

// READ operations
export const getByFolderId = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.params

        const results = await getByFolderIdMidW(folderId);
        if (!results) throw new Error("Error getting folder nodes.");

        res.status(200).json({ success: true, folderNodes: results });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
