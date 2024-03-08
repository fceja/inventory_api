import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const deleteByProductsIdMidW = async (productsId: number) => {
  let dbConn: PoolClient | null = null;

  try {
    const query = `
      DELETE FROM products A
      WHERE A.products_id = ${productsId}
    `;

    const result = await connPool.query(query);

    if (result.rowCount == 0) throw new Error(`Db error.\nquery -> ${query}`);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
