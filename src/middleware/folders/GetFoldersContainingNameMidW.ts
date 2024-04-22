import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getFoldersContainingNameMidW = async (folderName: string) => {
    let dbConn: PoolClient | null = null;
    try {
        const query = `
            SELECT *
            FROM "folders"
            WHERE LOWER("name") LIKE LOWER('%${folderName}%');
        `;

        const qResult = await connPool.query(query);
        if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

        return qResult.rows

    } catch (error) {
        console.error(error.message);

        return null;
    } finally {
        if (dbConn) (dbConn as PoolClient).release();
    }
};
