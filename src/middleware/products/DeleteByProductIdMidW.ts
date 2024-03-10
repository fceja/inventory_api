import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const deleteByProductIdMidW = async (productId: number) => {
  let dbConn: PoolClient | null = null;

  try {
    const query = `
      DELETE FROM products A
      WHERE A.product_id = ${productId}
    `;

    const qResult = await connPool.query(query);

    if (!qResult || qResult.rowCount === 0)
      throw new Error(`Db error.\nquery -> ${query}`);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
