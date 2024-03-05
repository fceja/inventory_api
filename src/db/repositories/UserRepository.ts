import { QueryResult } from "pg";

import { BaseRepository } from "@db/repositories/base/BaseRepository";
import UserModel from "@db/models/UserModel";
import UserRoleModel from "@db/models/UserRoleModel";

export class UserRepository extends BaseRepository<UserModel | UserRoleModel> {
  // create user
  async createUser(userData: UserModel) {
    try {
      const query = `
        INSERT INTO _users (email, password, created_at, last_updated)
        VALUES ('${userData.email}', '${userData.password}', '${userData.createdAt}', '${userData.lastUpdated}')
        ON CONFLICT (email) DO NOTHING
        RETURNING user_id, email, created_at, last_updated
        `;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // retrieves user by email
  async getUserByEmail(email: string) {
    try {
      const query = `
        SELECT *
        FROM _users A
        LEFT JOIN _user_roles B
        ON A.user_id = B.user_id
        WHERE A.email='${email}'
        `;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserByUserId(userId: string) {
    try {
      const query = `
        SELECT A.user_id, email, created_at, last_updated, role
        FROM _users A
        LEFT JOIN _user_roles B
        ON A.user_id=B.user_id
        WHERE A.user_id='${userId}'
        `;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // retrieve user by email and non-null role from db
  async getUserAndRoleByEmail(email: string): Promise<UserModel> {
    try {
      const query = `
        SELECT *
        FROM _users A
        LEFT JOIN _user_roles B
        ON A.user_id=B.user_id
        WHERE A.email='${email}' and B.role IS NOT NULL
        `;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // update user role
  async updateUserRole(userId: string, role: string) {
    try {
      const query = `
        INSERT INTO _user_roles (user_id, role)
        VALUES ('${userId}', '${role}')
        ON CONFLICT (user_id) DO UPDATE
        SET ROLE = excluded.role
        `;

      const queryResult: QueryResult = await this._pool.query(query);

      return !!queryResult.rowCount; // converts to boolean (0 false, 1 true)
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
