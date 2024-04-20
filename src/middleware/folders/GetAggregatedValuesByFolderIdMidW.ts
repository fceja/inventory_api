import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getAggregatedValuesByFolderIdMidW = async (folderId: string) => {
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
                SELECT f."folderId", i."itemId", i."value"
                FROM FolderHierarchy f
                LEFT JOIN items i ON f."folderId" = i."parentFolderId"
            )
            SELECT ROUND(COALESCE(SUM("value"), 0), 2) AS "valueTotal"

            FROM ItemHierarchy
            WHERE "itemId" IS NOT NULL;
        `;

        /**
         * Note: ROUND()rounds half to nearest even int
         * ROUND(2.5) -> 2, ROUND(3.5) -> 4.
         */

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
