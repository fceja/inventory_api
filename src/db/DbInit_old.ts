import CONFIG_FILE from "@configs/Config";
import { Pool } from "pg";

const dbPool = new Pool({
  host: CONFIG_FILE.DB_HOST,
  database: CONFIG_FILE.DB_NAME,
  user: CONFIG_FILE.DB_USER,
  password: CONFIG_FILE.DB_PASSWORD,
  port: parseInt(CONFIG_FILE.DB_PORT),
});

export default dbPool;
