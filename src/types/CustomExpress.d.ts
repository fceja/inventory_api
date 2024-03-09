import "express-session";
import { PoolClient } from "pg";

interface SystemUserSessionData {
  systemUserId: number | null;
  email: string | null;
  role: string | null;
  token: string | null;
}

declare module "express-session" {
  export interface SessionData {
    systemUser?: SystemUserSessionData;
  }
}

declare global {
  namespace Express {
    interface Request {
      db?: PoolClient;
    }
  }
}
