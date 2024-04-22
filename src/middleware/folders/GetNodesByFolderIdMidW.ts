import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"

export const getNodesByFolderIdMidW = async (folderId: string) => {
    let dbConn: PoolClient | null = null;
    try {
        let query: string

        // query folders
        query = `
            SELECT *
            FROM "folders"
            WHERE "parentFolderId" = ${folderId}
        `;

        let qResult1 = await connPool.query(query);
        if (!qResult1) throw new Error(`Db error.\nquery -> ${query}`);

        query = `
            SELECT *
            FROM "items"
            WHERE "parentFolderId" = ${folderId};
        `;

        const qResult2 = await connPool.query(query)
        if (!qResult2) throw new Error(`Db error.\nquery -> ${query}`);

        return [...qResult1.rows, ...qResult2.rows];

    } catch (error: unknown) {
        handleUnknownError(error)

        return null;
    } finally {
        if (dbConn) (dbConn as PoolClient).release();
    }
};
