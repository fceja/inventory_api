import { PoolClient } from "pg";

declare global {
  namespace Express {
    interface Request {
      db?: PoolClient;
    }
  }
}
