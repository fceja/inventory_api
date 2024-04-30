import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { ItemsModelI } from "@db/models/ItemsModel";
import { getCreateItemQuery } from "@db/queries/ItemQueries"

export const createItemMidW = async (itemData: ItemsModelI) => {
  let dbConn: PoolClient | null = null;

  try {
    const { query, queryParams } = getCreateItemQuery(itemData);

    const qResult = await connPool.query(query, queryParams);

    if (!qResult)
      throw new Error(
        `Db error.\nquery -> ${query}\nqueryParams -> ${queryParams}`,
      );

    return qResult.rowCount === 1 ? true : false;

  } catch (error: unknown) {
    handleUnknownError(error)

    return false;
  } finally {
    if (dbConn) (dbConn as PoolClient).release();
  }
};
