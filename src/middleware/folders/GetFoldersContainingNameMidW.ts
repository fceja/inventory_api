import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getFoldersContainingNameQuery } from "@db/queries/FolderQueries"

export const getFoldersContainingNameMidW = async (folderName: string) => {
    let dbConn: PoolClient | null = null;
    try {
        const query = getFoldersContainingNameQuery(folderName)
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
