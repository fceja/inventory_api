import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { handleUnknownError } from "@utils/ErrorUtils"
import { getDeleteItemByItemIdQuery } from "@db/queries/ItemQueries"

export const deleteByItemIdMidW = async (itemId: number) => {
  let dbConn: PoolClient | null = null;

  try {
    if (!itemId) throw new Error('Missing itemId')
    const query = getDeleteItemByItemIdQuery(itemId)

    const qResult = await connPool.query(query);

    if (!qResult || qResult.rowCount === 0)
      throw new Error(`Db error.\nquery -> ${query}`);

    return true;
  } catch (error: unknown) {
    handleUnknownError(error)

    return false;
  } finally {
    if (dbConn) (dbConn as PoolClient).release();
  }
};
