import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

import { ProductsModelI } from "@models/ProductsModel";

// helper
const generateQuery = (productId: number, productData: ProductsModelI) => {
  // generate sql query statement
  const setClausePairs = [];
  const queryParams = [];
  Object.entries(productData).forEach(([key]) => {
    setClausePairs.push(` ${key}=$${queryParams.length + 1}`);
    queryParams.push(productData[key]);
  });

  const querySetClause = setClausePairs.join(", ");
  queryParams.push(productId);

  // final query
  const query = `
    UPDATE products A
    SET ${querySetClause}, updated_at = CURRENT_TIMESTAMP
    WHERE A.product_id = $${queryParams.length}
  `;

  return { query: query, queryParams: queryParams };
};

export const updateByProductIdMidW = async (
  productId: number,
  productData: ProductsModelI,
) => {
  let dbConn: PoolClient | null = null;

  try {
    // generate query
    const { query, queryParams } = generateQuery(productId, productData);

    // query db
    const qResult = await connPool.query(query, queryParams);

    if (qResult.rowCount !== 1)
      throw new Error(
        `Db error.\nquery -> ${query}\nqueryParams -> ${queryParams}`,
      );

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
