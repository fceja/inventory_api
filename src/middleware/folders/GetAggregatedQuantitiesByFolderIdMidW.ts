import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getAggregatedQuantityByFolderIdMidW = async (folderId: string) => {
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
                SELECT f."folderId", i."itemId", i."quantity"
                FROM FolderHierarchy f
                LEFT JOIN items i ON f."folderId" = i."parentFolderId"
            )
            SELECT COALESCE(SUM("quantity"), 0)::INT AS "quantityTotal"
            FROM ItemHierarchy
            WHERE "itemId" IS NOT NULL;
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
