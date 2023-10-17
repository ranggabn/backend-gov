var connection = require("../config/db");
var jwt = require("jsonwebtoken");
var config = require("../config/params");
// var logger = require("../config/log");
const moment = require("moment");

exports.refresh = function (req, res) {
  var username = req.query.username;

  connection.query(
    `SELECT username, id_role, last_login, limit_login, u.id, nama_lengkap FROM "user" u LEFT JOIN assignment a ON u.id = a.id_user::INT WHERE username=$1`,
    [username],
    function (error, rows) {
      if (error) {
        //logger.error("Refresh : " + error);
      } else {
        var data = rows.rows;
        var datetime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        connection.query(
          `UPDATE akses_token set refreshed_at = $1 WHERE id = (SELECT id from akses_token where username = $2 ORDER BY id DESC LIMIT 1);`,
          [datetime, username],
          function (error, rows) {
            if (error) {
              //logger.error("Refresh : " + error);
            } else {
              var refresh_token = jwt.sign({ data }, config.secret, {
                expiresIn: "600000",
              });
              //logger.info("Refresh : Token JWT tergenerate");
              res.json({
                success: true,
                message: "Token JWT tergenerate",
                refresh_token,
              });
            }
          }
        );
      }
    }
  );
};
