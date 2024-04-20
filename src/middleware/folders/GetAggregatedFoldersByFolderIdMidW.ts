import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getAggregatedFoldersByFolderIdMidW = async (folderId: string) => {
    let dbConn: PoolClient | null = null;
    try {
        const query = `
            WITH RECURSIVE FolderHierarchy AS (
                SELECT "folderId", "parentFolderId"
                FROM folders
                WHERE "folderId" = ${folderId}

                UNION ALL

                SELECT f."folderId", f."parentFolderId"
                FROM folders f
                JOIN FolderHierarchy fh ON f."parentFolderId" = fh."folderId"
            )
            SELECT COUNT(*)::INT - 1 AS "folderTotal" -- exclude current folder
            FROM FolderHierarchy;
        `;

        const qResult = await connPool.query(query);
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

        return qResult.rows[0]

    } catch (error) {
        console.error(error.message);

        return null;
    } finally {
        if (dbConn) dbConn.release();
    }
};