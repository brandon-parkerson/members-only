const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function insertUser(
  firstName,
  lastName,
  email,
  password,
  membershipStatus
) {
  await pool.query(
    "INSERT INTO users (user_first_name, user_last_name, email, password, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, email, password, membershipStatus]
  );
}

async function makeMember(id) {
  await pool.query(
    `UPDATE users SET membership_status = 'yes' WHERE user_id = ${id}`
  );
}

async function insertMessage(message, date, author, userid) {
  await pool.query(
    `INSERT INTO messages (message, date, author, userid) VALUES ($1, $2, $3, $4)`,
    [message, date, author, userid]
  );
}

async function getMessages() {
  const { rows } = await pool.query(`SELECT * FROM messages`);
  return rows;
}

module.exports = {
  getAllUsers,
  insertUser,
  makeMember,
  insertMessage,
  getMessages,
};
