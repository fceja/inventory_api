import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getAllItemsQuery } from "@db/queries/ItemQueries"

export const getAllItemsMidW = async () => {
  let dbConn: PoolClient | null = null;
  try {
    const query = getAllItemsQuery()

    const qResult = await connPool.query(query);

    if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

    return qResult.rows;
  } catch (error: unknown) {
    handleUnknownError(error)

    return null;
  } finally {
    if (dbConn) (dbConn as PoolClient).release();
  }
};
