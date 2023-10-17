"use strict";

var nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
var connection = require("../config/db");
var jwt = require("jsonwebtoken");
var config = require("../config/params");
var md5 = require("md5");
var CryptoJS = require("crypto-js");
var logger = require("../config/log");

exports.getToken = function (req, res) {
  var username = req.body.username;

  logger.info("Get Token : Try to get data.");
  connection.query(
    `SELECT * FROM "user" WHERE username=$1`,
    [username],
    function (error, rows) {
      if (error) {
        logger.error("Get Token : " + error);
      } else {
        logger.info("Get Token : Get data success.");
        var data = rows.rows;
        if (data.length > 0) {
          var forgot_token = jwt.sign({ data }, config.secret, {
            expiresIn: "600000",
          });
          var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
              if (err) {
                callback(err);
                throw err;
              } else {
                callback(null, html);
              }
            });
          };

          logger.info("Get Token : Try to send email.");
          var smtpTransport = nodemailer.createTransport({
            host: config.EMAIL_HOST,
            port: 25,
            secure: false,
            auth: {
              user: config.EMAIL,
              pass: config.PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            },
            proxy: "http://172.20.0.5:8080",
            // proxy: "http://etmakno5162:Bsi123@172.20.0.5:8080",
          });

          readHTMLFile(
            __dirname + "/template/emailWithPDF.html",
            function (err, html) {
              var replacements = {
                username: data[0].nama_lengkap,
                url: forgot_token,
                url_frontend: config.URL_FRONTEND,
              };

              var template = handlebars.compile(html);
              var htmlToSend = template(replacements);
              var mailOptions = {
                from: config.EMAIL,
                to: data[0].email,
                subject: "Reset Password Simpel Proper",
                html: htmlToSend,
                attachments: [
                  {
                    filename: "logo-simpleproper.png",
                    path: __dirname + "/images/logo-simpleproper.png",
                    cid: "logo",
                  },
                ],
              };

              smtpTransport.sendMail(mailOptions, function (error, info) {
                if (error) {
                  logger.error("Get Token : " + error);
                } else {
                  logger.info("Get Token : Berhasil Kirim Email");
                  res.json({
                    status: "00",
                    message: "Berhasil kirim email.",
                  });
                }
              });
            }
          );
        } else {
          logger.info("Get Token : Username tidak terdaftar.");
          res.json({
            status: "99",
            message: "Username tidak terdaftar.",
          });
        }
      }
    }
  );
};

exports.checkToken = function (req, res) {
  var data = jwt.decode(req.query.token);

  if (Date.now() >= data.exp * 1000) {
    logger.info("Check Token : false");
    res.json({
      status: "00",
      data: false,
    });
  } else {
    logger.info("Check Token : true");
    res.json({
      status: "00",
      data: true,
    });
  }
};

exports.changePassword = function (req, res) {
  var data = jwt.decode(req.query.token);
  var password = CryptoJS.AES.encrypt(md5(req.body.password), config.secret);

  connection.query(
    `UPDATE "user" set password=$1 WHERE id=$2`,
    [password.toString(), data.data[0].id],
    function (error, rows) {
      if (error) {
        logger.error("Change Password : " + error);
      } else {
        logger.info("Change Password : Success submit new password");
        res.json({
          status: "00",
          message: "Success submit new password",
        });
      }
    }
  );
};
