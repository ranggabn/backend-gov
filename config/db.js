const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "rangga050115",
  database: "db_gov",
});

module.exports = pool;
