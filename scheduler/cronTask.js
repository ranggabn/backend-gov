var cron = require("node-cron");
var log = require("../config/log");
var connection = require("../config/db");

const task = cron.schedule(
  "0 1 * * *",
  () => {
    log.info("Cron - Reset last login");
    connection.query(
      `UPDATE "user" SET last_login = null;`,
      function (error, rows, field) {
        if (error) {
          log.error("Cron - Error Reset last login : " + error);
        } else {
          log.info("Cron - Success Reset last login");
        }
      }
    );
  },
  {
    scheduled: false,
  }
);

module.exports = task;
