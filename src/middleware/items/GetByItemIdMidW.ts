import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { getItemByItemIdQuery } from "@db/queries/ItemQueries"
import { handleUnknownError } from "@utils/ErrorUtils"

export const getByItemIdMidW = async (itemId: number) => {
    let dbConn: PoolClient | null = null;

    try {
        const query = getItemByItemIdQuery(itemId)
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
