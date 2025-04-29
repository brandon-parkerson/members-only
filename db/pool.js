const { Pool } = require("pg");

const pool = new Pool({
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
})
