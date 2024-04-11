import assert from "assert";
import bcrypt from "bcrypt";
import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import { SystemUserModelI } from "@db/models/SystemUserModel";

export const authSystemUserMidW = async (email: string, password: string) => {
  let dbConn: PoolClient | null = null;

  try {
    dbConn = await connPool.connect();

    const query = `
      SELECT *
      FROM "systemUsers" A
      WHERE A."email"='${email}'
    `;
    const qResult = await dbConn.query(query);
    if (!qResult) throw new Error(`Db error.\nquery -> ${query}`);

    const storedUser: SystemUserModelI = qResult.rows[0];
    if (!storedUser) throw new Error(`System user does not exist.`);

    const validRoles = ["admin", "mngr", "staff"];
    assert.ok(
      validRoles.includes(storedUser.role),
      `Invalid role: ${storedUser.role}`,
    );
    assert.equal(storedUser.email, email);

    if (!bcrypt.compareSync(password, storedUser.password))
      throw new Error("Invalid password.");

    return storedUser;
  } catch (error) {
    console.error(error.message);

    return null;
  } finally {
    if (dbConn) dbConn.release();
  }
};
