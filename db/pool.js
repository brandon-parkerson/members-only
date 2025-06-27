const { Pool } = require("pg");
require("dotenv").config();

const connectionString =
  "postgresql://postgres:wfdunVSFgOHICBzWWnASIGsyXDIirTYR@yamabiko.proxy.rlwy.net:49787/railway";

const pool = new Pool({
  connectionString: connectionString,
});

console.log("🔌 Connecting to DB at:", connectionString);

module.exports = pool;
