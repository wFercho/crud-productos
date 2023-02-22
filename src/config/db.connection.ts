import { Pool } from "pg";

import { ENV } from "./env/env.variables";

const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_USERPASS } = ENV;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_USERPASS,
  port: DB_PORT,
  database: DB_NAME,
});
pool.connect();
pool.query(
  "CREATE TABLE IF NOT EXISTS product (id SERIAL PRIMARY KEY, name VARCHAR(200), description VARCHAR(200), price INT)"
);


export { pool };
