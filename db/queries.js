const { user } = require("pg/lib/defaults.js");
const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function insertUser(
  firstName,
  lastName,
  username,
  password,
  membershipStatus
) {
  await pool.query(
    "INSERT INTO users (user_first_name, user_last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, membershipStatus]
  );
}

module.exports = {
  getAllUsers,
  insertUser,
};
