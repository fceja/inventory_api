import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getUsers = async () => {
  let dbConn: PoolClient | null = null;

  try {
    const qResult = await connPool.query(`
        SELECT *
        FROM users
    `);

    return qResult.rows;
  } catch (error) {
    console.error(error);

    return null;
  } finally {
    if (dbConn) dbConn.release();
  }
};