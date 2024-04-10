import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getByFolderIdMidW = async (folderId: string) => {
    let dbConn: PoolClient | null = null;
    try {
        let query: string

        // query folders
        query = `
        SELECT *
        FROM folders
        WHERE parent_folder_id = ${folderId}
        `;

        let qResult1 = await connPool.query(query);
        if (!qResult1) throw new Error(`Db error.\nquery -> ${query}`);

        // query items
        query = `
            SELECT *
            FROM items
            WHERE parent_folder_id = ${folderId};
        `;

        const qResult2 = await connPool.query(query)
        if (!qResult2) throw new Error(`Db error.\nquery -> ${query}`);

        return [...qResult1.rows, ...qResult2.rows];

    } catch (error) {
        console.error(error.message);

        return null;
    } finally {
        if (dbConn) dbConn.release();
    }
};
