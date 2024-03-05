import { Response, Request, NextFunction } from "express";
import { Pool, PoolClient } from "pg";

import CONFIG_FILE from "@configs/Config";

const pool = new Pool({
  host: CONFIG_FILE.DB_HOST,
  database: CONFIG_FILE.DB_NAME,
  user: CONFIG_FILE.DB_USER,
  password: CONFIG_FILE.DB_PASSWORD,
  port: parseInt(CONFIG_FILE.DB_PORT),
});

export const DbPoolClient = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    pool
      .connect()
      .then((client: PoolClient) => {
        req.db = client;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  };
};
