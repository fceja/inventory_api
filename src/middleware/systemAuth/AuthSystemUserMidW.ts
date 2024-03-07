import assert from "assert";
import bcrypt from "bcrypt";
import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import SystemStoredUserModel from "@db/models/SystemStoredUserModel";

export const authSystemUserMidW = async (email: string, password: string) => {
  let dbConn: PoolClient | null = null;

  try {
    dbConn = await connPool.connect();

    const qResult = await dbConn.query(`
      SELECT *
      FROM system_users A
      WHERE A.email='${email}'
    `);

    const storedUser = qResult.rows[0];
    if (!storedUser) return null;

    const validRoles = ["admin", "mngr", "staff"];
    assert.ok(
      validRoles.includes(storedUser.role),
      `Invalid role: ${storedUser.role}`,
    );
    assert.equal(storedUser.email, email);

    if (!bcrypt.compareSync(password, storedUser.password))
      throw new Error("Invalid password.");

    const storedUserInfo = new SystemStoredUserModel(storedUser);

    return storedUserInfo;
  } catch (error) {
    console.error(error.message);

    return null;
  } finally {
    if (dbConn) dbConn.release();
  }
};
