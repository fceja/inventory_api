import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getByItemIdMidW = async (itemId: string) => {
    let dbConn: PoolClient | null = null;

    try {
        const query =
            `
                SELECT *
                FROM "items"
                WHERE "itemId" = ${itemId}
            `;

        const qResult = await connPool.query(query);
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

        return qResult.rows[0];

    } catch (error) {
        console.error(error.message);

        return null;
    } finally {
        if (dbConn) dbConn.release();
    }
};
