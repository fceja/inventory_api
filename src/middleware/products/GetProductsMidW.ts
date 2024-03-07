import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const getProductsMidW = async () => {
  let dbConn: PoolClient | null = null;
  try {
    const qResult = await connPool.query(`
            SELECT *
            FROM products
        `);

    return qResult.rows;
  } catch (error) {
    console.error(error.message);

    return null;
  } finally {
    if (dbConn) dbConn.release();
  }
};
