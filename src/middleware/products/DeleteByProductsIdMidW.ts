import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

export const deleteByProductsIdMidW = async (productsId: number) => {
  let dbConn: PoolClient | null = null;

  try {
    const result = await connPool.query(`
        DELETE FROM products A
        WHERE A.products_id = ${productsId}
    `);

    if (result.rowCount == 0)
      throw new Error(`Record with productsId ${productsId} did not exist.`);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
