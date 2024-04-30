import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { ItemsModelI } from "@models/ItemsModel";
import { getUpdateItemByItemId } from "@db/queries/ItemQueries"


export const updateByItemIdMidW = async (
  itemId: number,
  itemData: ItemsModelI,
) => {
  let dbConn: PoolClient | null = null;

  try {
    // generate query
    const { query, queryParams } = getUpdateItemByItemId(itemId, itemData);

    // query db
    const qResult = await connPool.query(query, queryParams);

    if (qResult.rowCount !== 1)
      throw new Error(
        `Db error.\nquery -> ${query}\nqueryParams -> ${queryParams}`,
      );

    return true;
  } catch (error: unknown) {
    handleUnknownError(error)

    return false;
  } finally {
    if (dbConn) (dbConn as PoolClient).release();
  }
};
