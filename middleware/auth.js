var connection = require("../config/db");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
var config = require("../config/params");
var ip = require("ip");
var CryptoJS = require("crypto-js");
var logger = require("../config/log");
var axios = require("axios-https-proxy-fix");
const moment = require("moment");

// controller untuk register
exports.reqistrasi = function (req, res) {
  var username = req.body.username;
  var password = CryptoJS.AES.encrypt(md5(req.body.password), config.secret);
  var nama_lengkap = req.body.nama_lengkap;
  var email = req.body.email;

  connection.query(
    `SELECT username FROM "user" WHERE username=$1`,
    [username],
    function (error, rows) {
      if (error) {
        logger.error("Registrasi : " + error);
      } else {
        if (rows.rows.length == 0) {
          connection.query(
            `INSERT INTO "user"(username, password, nama_lengkap, email) VALUES ($1, $2, $3, $4)`,
            [username, password.toString(), nama_lengkap, email],
            function (error, rows) {
              if (error) {
                logger.error("Registrasi : " + error);
              } else {
                logger.info("Registrasi : Pendaftaran berhasil.");
                res.json({ status: "00", message: "Pendaftaran berhasil!" });
              }
            }
          );
        } else {
          logger.info("Registrasi : Username sudah terdaftar.");
          res.json({ status: "99", message: "Username sudah terdaftar!" });
        }
      }
    }
  );
};

//controller login
exports.login = async function (req, res) {
  logger.info("Login : Start login.");
  var username = req.body.username;
  var password = md5(req.body.password);
  var captcha = req.body.captcha;
  var now = new Date();

  // axios
  //   .post(
  //     config.URL_GOOGLE + `?secret=${config.SECRET_KEY}&response=${captcha}`,
  //     {},
  //     {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  // },
  // params: {
  //   secret: config.SECRET_KEY,
  //   response: captcha,
  // },
  // proxy: config.proxy,
  //   }
  // )
  // .then(function (response) {
  //   logger.info(
  //     "Login - Response recaptcha : " + JSON.stringify(response.data)
  //   );
  //   if (response.data.success) {
  connection.query(
    `SELECT * FROM "user" WHERE username=$1`,
    [username],
    function (error, rows) {
      if (error) {
        logger.error("Login : " + error);
      } else {
        var data = rows.rows;
        if (data.length == 1) {
          var decrypted_pass = CryptoJS.AES.decrypt(
            data[0].password,
            config.secret
          );
          var object = decrypted_pass.toString(CryptoJS.enc.Utf8);
          if (object === password) {
            connection.query(
              `SELECT username, id_role, last_login, limit_login, u.id, nama_lengkap FROM "user" u LEFT JOIN assignment a ON u.id = a.id_user::INT WHERE username=$1`,
              [username],
              function (error, rows) {
                if (error) {
                  logger.error("Login : " + error);
                } else {
                  var data = rows.rows;
                  var role = "";
                  if (data[0].limit_login > 7) {
                    logger.info(`Login : ${username} User locked.`);
                    res.json({
                      Error: true,
                      Message: "User locked.",
                    });
                  } else if (data[0].last_login) {
                    connection.query(
                      `SELECT refreshed_at, created_at from akses_token where username = $1 ORDER BY id DESC LIMIT 1`,
                      [username],
                      function (error, rows) {
                        if (error) {
                          logger.error("Login : " + error);
                        } else {
                          var duration = moment
                            .utc(Date.now())
                            .diff(
                              moment.utc(rows.rows[0].refreshed_at),
                              "minutes"
                            );
                          if (duration > 10) {
                            connection.query(
                              `SELECT id_role FROM assignment WHERE id_user=$1`,
                              [data[0].id],
                              function (error, rows) {
                                if (error) {
                                  logger.error("Login : " + error);
                                } else {
                                  role = rows.rows[0].id_role;
                                }
                              }
                            );
                            var token = jwt.sign({ data }, config.secret, {
                              expiresIn: "600000",
                            });
                            var user = data[0].username;
                            var nama_lengkap = data[0].nama_lengkap;

                            connection.query(
                              `UPDATE "user" SET last_login=$1 WHERE username=$2`,
                              [now, user],
                              function (error, rows) {
                                if (error) {
                                  logger.error("Login : " + error);
                                } else {
                                  connection.query(
                                    `INSERT INTO akses_token(username, access_token, ip_address) VALUES($1, $2, $3)`,
                                    [user, token, ip.address()],
                                    function (error, rows) {
                                      if (error) {
                                        logger.error("Login : " + error);
                                      } else {
                                        logger.info(
                                          "Login : Token JWT tergenerate."
                                        );
                                        res.json({
                                          success: true,
                                          message: "Token JWT tergenerate",
                                          token: token,
                                          username: user,
                                          role: role,
                                          nama: nama_lengkap,
                                        });
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          } else {
                            logger.info(
                              `Login : Login gagal. Akun anda ${username} sedang login pada perangkat / browser lain. Aktifitas terakhir : ` +
                                duration +
                                " menit yang lalu."
                            );
                            res.json({
                              status: "88",
                              message:
                                "Login gagal. Akun anda sedang login pada perangkat / browser lain.",
                            });
                          }
                        }
                      }
                    );
                  } else {
                    connection.query(
                      `SELECT id_role FROM assignment WHERE id_user=$1`,
                      [data[0].id],
                      function (error, rows) {
                        if (error) {
                          logger.error("Login : " + error);
                        } else {
                          role = rows.rows[0].id_role;
                        }
                      }
                    );
                    var token = jwt.sign({ data }, config.secret, {
                      expiresIn: "600000",
                    });
                    var user = data[0].username;
                    var nama_lengkap = data[0].nama_lengkap;

                    connection.query(
                      `UPDATE "user" SET last_login=$1 WHERE username=$2`,
                      [now, user],
                      function (error, rows) {
                        if (error) {
                          logger.error("Login : " + error);
                        } else {
                          connection.query(
                            `INSERT INTO akses_token(username, access_token, ip_address) VALUES($1, $2, $3)`,
                            [user, token, ip.address()],
                            function (error, rows) {
                              if (error) {
                                logger.error("Login : " + error);
                              } else {
                                logger.info(
                                  `Login : ${username} Token JWT tergenerate.`
                                );
                                res.json({
                                  success: true,
                                  message: "Token JWT tergenerate",
                                  token: token,
                                  username: user,
                                  role: role,
                                  nama: nama_lengkap,
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              }
            );
          } else {
            connection.query(
              `UPDATE "user" SET limit_login = (limit_login::int + 1) WHERE username=$1;`,
              [username],
              function (error, rows) {
                if (error) {
                  logger.error("Login : " + error);
                } else {
                  connection.query(
                    `SELECT limit_login FROM "user" WHERE username=$1`,
                    [username],
                    function (error, rows) {
                      if (error) {
                        logger.error("Login : " + error);
                      } else {
                        var limit = rows.rows[0].limit_login;
                        if (limit > 6) {
                          logger.info(
                            `Login : ${username} Mismatch account and password for ` +
                              limit +
                              " times. User locked"
                          );
                          res.json({
                            Error: true,
                            Message:
                              "Mismatch account and password for " +
                              limit +
                              " times. User locked",
                          });
                        } else {
                          logger.info(
                            `Login : ${username} Mismatch account and password`
                          );
                          res.json({
                            Error: true,
                            Message: "Mismatch account and password",
                          });
                        }
                      }
                    }
                  );
                }
              }
            );
          }
        } else {
          logger.info(`Login : ${username} Mismatch account and password`);
          res.json({
            Error: true,
            Message: "Mismatch account and password",
          });
        }
      }
    }
  );
  // } else {
  //   logger.info("Login : Failed verify captcha. Try again.");
  //   return res.json({
  //     status: "88",
  //     message: "Failed verify captcha. Try again.",
  //   });
  // }
  // })
  // .catch(function (error) {
  //   logger.error("Login : " + error);
  // });
};
