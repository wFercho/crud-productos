import { Pool } from "pg";

import { ENV } from "./env/env.variables";

const {DB_HOST, DB_NAME, DB_PORT,DB_USER, DB_USERPASS} = ENV
let pool: Pool;
const connectToDB = async () => {
    try {
        pool = new Pool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_USERPASS,
            port: DB_PORT,
            database: DB_NAME,
          });
          await pool.connect()
    } catch (error) {
        console.log(error);
    }
}

connectToDB()

export { pool };
