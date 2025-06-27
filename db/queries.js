const pool = require("./pool");

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      user_first_name VARCHAR(255) NOT NULL,
      user_last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      membership_status VARCHAR(255) NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      messageid SERIAL PRIMARY KEY,
      message TEXT,
      date VARCHAR(255),
      author VARCHAR(255),
      userid INTEGER,
      CONSTRAINT messages_userid_fkey FOREIGN KEY (userid) REFERENCES users(user_id)
    );
  `);

  console.log("Tables created or already exist.");
}

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
    `UPDATE users SET membership_status = 'yes' WHERE user_id = $1`,
    [id]
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
  initDb,
  getAllUsers,
  insertUser,
  makeMember,
  insertMessage,
  getMessages,
};
