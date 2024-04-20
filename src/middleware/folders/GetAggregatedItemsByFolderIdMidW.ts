import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getAggregatedItemsByFolderIdMidW = async (folderId: string) => {
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
            ),
            ItemHierarchy AS (
                SELECT f."folderId", i."itemId"
                FROM FolderHierarchy f
                LEFT JOIN items i ON f."folderId" = i."parentFolderId"
            )
            SELECT COUNT(DISTINCT "itemId")::INT AS "itemTotal"
            FROM ItemHierarchy
            WHERE "itemId" IS NOT NULL;
        `;

        const qResult = await connPool.query(query);
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);
        console.log(`qResult.rows[0]`)
        console.log(qResult.rows[0])

        return qResult.rows[0]

    } catch (error) {
        console.error(error.message);

        return null;
    } finally {
        if (dbConn) dbConn.release();
    }
};