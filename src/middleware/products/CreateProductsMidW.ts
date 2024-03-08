import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { ProductsModelI } from "@db/models/ProductsModel";
import { camelToSnake } from "@utils/StringUtils";

const generateQuery = (productsData: ProductsModelI) => {
  // generate sql query statement
  const productsProps = [];
  const valuesClause = [];
  const queryParams = [];
  Object.entries(productsData).forEach(([key]) => {
    const snakeCaseString = camelToSnake(key);
    productsProps.push(snakeCaseString);
    valuesClause.push(`$${queryParams.length + 1}`);
    queryParams.push(productsData[key]);
  });

  const querySetClause = valuesClause.join(", ");
  const queryProductsProps = productsProps.join(", ");

  // final query
  const query = `
    INSERT INTO products (${queryProductsProps})
    VALUES (${querySetClause})
  `;

  return { query: query, queryParams: queryParams };
};

export const createProductsMidW = async (productsData: ProductsModelI) => {
  let dbConn: PoolClient | null = null;

  try {
    /**
     * NOTE - the following are generated automatically by db
     * product_id
     * created_at,
     * updated_at,
     */

    const { query, queryParams } = generateQuery(productsData);

    const qResult = await connPool.query(query, queryParams);

    if (qResult.rowCount == 1) return true;

    throw new Error("Error creating.");
  } catch (error) {
    console.error(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
