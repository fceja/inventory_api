import { WriteInterface } from "../interfaces/WriteInterface";
import { ReadInterface } from "../interfaces/ReadInterface";
import { Pool, QueryResult } from "pg";

export abstract class BaseRepository<T>
  implements WriteInterface<T>, ReadInterface<T>
{
  readonly _pool: Pool;
  readonly _tableName: string;

  constructor(pool: Pool, tableName: string) {
    this._pool = pool;
    this._tableName = tableName;
  }

  async create(item: T): Promise<boolean> {
    try {
      const columns = Object.keys(item)
        .map((column) => `${column}`)
        .join(", ");

      const values = Object.values(item)
        .map((value) => `'${value}'`)
        .join(", ");

      const query = `INSERT INTO ${this._tableName} (${columns}) VALUES (${values})`;

      const queryResult: QueryResult = await this._pool.query(query);

      /**
       *
       * After insert operation, 'queryResult' return an object.
       * We convert 'rowCount' prop to boolean (0 false, 1 true)
       *
       **/
      return !!queryResult.rowCount;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async find(item: T): Promise<T[]> {
    try {
      let query = `SELECT * FROM ${this._tableName}`;
      let conditions = ` WHERE`;

      const columns = Object.keys(item);
      const values = Object.values(item);

      let firstFilled = false;
      columns.forEach((column, index) => {
        if (values[index]) {
          const condition = !firstFilled ? "" : " AND";
          conditions += `${condition} ${this._tableName}.${column}='${values[index]}'`;

          firstFilled = true;
        }
      });

      query += conditions;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }

  async retrieveAllTableRecords(): Promise<T[]> {
    try {
      let query = `SELECT * FROM ${this._tableName}`;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
