import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getFolderHierarchyQuery } from "@db/queries/FolderQueries"

export const getFolderHierarchyMidW = async () => {
    let dbConn: PoolClient | null = null;

    try {
        console.log(`query1`)
        const query = getFolderHierarchyQuery()
        console.log(`query2`)
        console.log(query)

        const qResult = await connPool.query(query);
        console.log(`qResult`)
        console.log(qResult)
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

        return qResult.rows

    } catch (error: unknown) {
        handleUnknownError(error)

        return null;
    } finally {
        if (dbConn) (dbConn as PoolClient).release();
    }
};
