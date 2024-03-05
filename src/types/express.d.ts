import "express-session";
import { PoolClient } from "pg";

declare module "express-session" {
  export interface SessionData {
    userId: string;
    email: string;
    userRole: string;
    token: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      db?: PoolClient;
    }
  }
}
