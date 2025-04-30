const {Client} = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
first_name VARCHAR(255), last_name VARCHAR(255), username VARCHAR(255), password VARCHAR(255),
membership_status VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
user_id INT NOT NULL,
title VARCHAR(255),
timestamp VARCHAR(255),
text VARCHAR(1000),
FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (first_name, last_name, username, password, membership_status)
VALUES ('Petra', 'Silkamo', 'silkamo1', 'osmo', 'member');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: "postgresql://bkpkp1996:725Bp6758@localhost:5432/members_only_db",
      });
      await client.connect();
      await client.query(SQL);
      await client.end();
      console.log("done");
}

main();