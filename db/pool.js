const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("🔌 Connecting to DB at:", connectionString);

module.exports = pool;
