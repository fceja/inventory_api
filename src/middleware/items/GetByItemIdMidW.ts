import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"

export const getByItemIdMidW = async (itemId: string) => {
    let dbConn: PoolClient | null = null;

    try {
        const query =
            `
                SELECT
                    "itemId",
                    "parentFolderId",
                    "name",
                    "nodeType",
                    "quantity",
                    "cost"::float,
                    "price"::float,
                    "createdAt",
                    "updatedAt"
                FROM "items"
                WHERE "itemId" = ${itemId}
            `;

        const qResult = await connPool.query(query);
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

        return qResult.rows[0];

    } catch (error: unknown) {
        handleUnknownError(error)

        return null;
    } finally {
        if (dbConn) (dbConn as PoolClient).release();
    }
};
