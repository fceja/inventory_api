import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getChildFoldersByFolderIdQuery } from "@db/queries/FolderQueries"
import { getChildItemsByParentFolderIdQuery } from "@db/queries/ItemQueries"

export const getNodesByFolderIdMidW = async (parentFolderId: number) => {
    let dbConn: PoolClient | null = null;
    try {
        let query: string

        query = getChildFoldersByFolderIdQuery(parentFolderId)
        let qResult1 = await connPool.query(query);
        if (!qResult1) throw new Error(`Db error.\nquery -> ${query}`);

        query = getChildItemsByParentFolderIdQuery(parentFolderId)
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
