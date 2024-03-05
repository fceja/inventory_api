import { Pool } from "pg";

import CONFIG_FILE from "@configs/Config";

// initialize connection pool for db
export const connPool = new Pool({
  host: CONFIG_FILE.DB_HOST,
  database: CONFIG_FILE.DB_NAME,
  user: CONFIG_FILE.DB_USER,
  password: CONFIG_FILE.DB_PASSWORD,
  port: parseInt(CONFIG_FILE.DB_PORT),
});
