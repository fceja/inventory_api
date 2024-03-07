import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";

import { ProductsModelI } from "@models/ProductsModel";

// region - helpers
const generateQuery = (productsId: number, productsData: ProductsModelI) => {
  // generate SET clause and params for query
  const setClausePairs = [];
  const queryParams = [];
  Object.entries(productsData).forEach(([key]) => {
    setClausePairs.push(` ${key}=$${queryParams.length + 1}`);
    queryParams.push(productsData[key]);
  });

  const querySetClause = setClausePairs.join(", ");
  queryParams.push(productsId);

  // final query
  const query = `
  UPDATE products A
  SET ${querySetClause}, updated_at = CURRENT_TIMESTAMP
  WHERE A.products_id = $${queryParams.length}
  `;

  return { query: query, queryParams: queryParams };
};

const validateModelProps = (productsData: ProductsModelI) => {
  // using type coercion to check for null or undefined values
  if (productsData.hasOwnProperty("name") && productsData.name == null)
    throw new Error("'name' prop cannot be null | undefined");
  if (
    productsData.hasOwnProperty("quantity") &&
    (productsData.quantity == null || productsData.quantity < 0)
  )
    throw new Error(
      "'quantity' prop cannot be null | undefined | less than zero",
    );
};
// endregion - helpers

export const updateByProductsIdMidW = async (
  productsId: number,
  productsData: ProductsModelI,
) => {
  let dbConn: PoolClient | null = null;

  try {
    // validate model props
    validateModelProps(productsData);

    // generate query
    const { query, queryParams } = generateQuery(productsId, productsData);

    // query db
    const qResult = await connPool.query(query, queryParams);

    // verify results
    if (qResult.rowCount != 1)
      throw new Error(
        `Error updating record. 'productsId' ${productsId}, 'rowCount' ${qResult.rowCount}`,
      );

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
