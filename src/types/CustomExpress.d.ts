import "express-session";
import { PoolClient } from "pg";

declare module "express-session" {
  export interface SessionData {
    systemUser?: SystemUserSessionData;
  }
}

interface SystemUserSessionData {
  systemUsersId: Number;
  email: string;
  role: string;
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      db?: PoolClient;
    }
  }
}
