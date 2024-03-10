import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { ProductsModelI } from "@db/models/ProductsModel";
import { camelToSnake } from "@utils/StringUtils";

const generateQuery = (productData: ProductsModelI) => {
  // generate sql query statement
  const productProps = [];
  const valuesClause = [];
  const queryParams = [];
  Object.entries(productData).forEach(([key]) => {
    const snakeCaseString = camelToSnake(key);
    productProps.push(snakeCaseString);
    valuesClause.push(`$${queryParams.length + 1}`);
    queryParams.push(productData[key]);
  });

  const querySetClause = valuesClause.join(", ");
  const queryProductProps = productProps.join(", ");

  // final query
  const query = `
    INSERT INTO products (${queryProductProps})
    VALUES (${querySetClause})
  `;

  return { query: query, queryParams: queryParams };
};

export const createProductMidW = async (productData: ProductsModelI) => {
  let dbConn: PoolClient | null = null;

  try {
    const { query, queryParams } = generateQuery(productData);

    const qResult = await connPool.query(query, queryParams);

    if (!qResult)
      throw new Error(
        `Db error.\nquery -> ${query}\nqueryParams -> ${queryParams}`,
      );

    return qResult.rowCount === 1 ? true : false;
  } catch (error) {
    console.error(error.message);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
