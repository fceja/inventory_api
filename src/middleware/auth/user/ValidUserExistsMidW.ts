import { PoolClient } from "pg";
import assert from "assert";

import { connPool } from "@db/DbPoolClient";
import UserModel from "@db/models/UserModel";

export const validUserExists = async (userData: UserModel) => {
  let dbConn: PoolClient | null = null;

  try {
    const { email } = userData;

    dbConn = await connPool.connect();

    const qResult = await dbConn.query(`
      SELECT *
      FROM users A
      WHERE A.email='${email}'
    `);

    const storedUser = qResult.rows[0];
    if (!storedUser) return false;

    const validRoles = ["admin", "mngr", "staff"];
    assert.ok(
      validRoles.includes(storedUser.role),
      `Invalid role: ${storedUser.role}`,
    );
    assert.equal(storedUser.email, email);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
