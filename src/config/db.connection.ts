import { Pool } from "pg";

import { ENV } from "./env/env.variables";

const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_USERPASS } = ENV;

let pool: any;

const connectToDB = async () => {
  pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_USERPASS,
    port: DB_PORT,
    database: DB_NAME,
  });
  await pool.connect();
  await pool.query(
    "CREATE TABLE IF NOT EXISTS product (id SERIAL PRIMARY KEY, name VARCHAR(200), description VARCHAR(200), price INT)"
  );
};

connectToDB();

export { pool };
