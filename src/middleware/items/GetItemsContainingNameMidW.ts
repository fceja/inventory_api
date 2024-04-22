import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getItemContainingNameQuery } from "@db/queries/ItemQueries"

export const getItemsContainingNameMidW = async (itemName: string) => {
    let dbConn: PoolClient | null = null;
    try {
        const query = getItemContainingNameQuery(itemName)
        const qResult = await connPool.query(query);
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

        return qResult.rows

    } catch (error: unknown) {
        handleUnknownError(error)

        return null;
    } finally {
        if (dbConn) (dbConn as PoolClient).release();
    }
};
