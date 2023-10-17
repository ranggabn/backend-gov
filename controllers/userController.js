"use strict";

var response = require("../config/res");
var connection = require("../config/db");
var md5 = require("md5");
var CryptoJS = require("crypto-js");
var config = require("../config/params");
var logger = require("../config/log");
var jwt = require("jsonwebtoken");

exports.menu = function (req, res) {
  var token_array = req.headers.authorization.split(" ");
  var token = jwt.decode(token_array[1])?.data[0];
  var id_role = token.id_role;

  connection.query(
    `SELECT m.* from menu m LEFT JOIN akses_role ar ON m.id::int = ar.id_menu::int WHERE id_role IN ($1, '99') ORDER BY m.urutan::int;`,
    [id_role],
    function (error, rows, field) {
      if (error) {
        logger.error("Menu : " + error);
      } else {
        var data = rows.rows;
        logger.trace("Menu : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.routes = function (req, res) {
  var token_array = req.headers.authorization.split(" ");
  var token = jwt.decode(token_array[1])?.data[0];
  var id_role = token.id_role;

  connection.query(
    `SELECT m.path from menu m LEFT JOIN akses_role ar ON m.id::int = ar.id_menu::int WHERE id_role IN ($1, '99') ORDER BY m.urutan::int;`,
    [id_role],
    function (error, rows, field) {
      if (error) {
        logger.error("Routes : " + error);
      } else {
        var data = rows.rows;
        var new_array = data.map(function (item) {
          return item.path;
        });
        logger.trace("Routes : " + JSON.stringify(new_array));
        res.json({ status: "00", message: "Success", data: new_array });
      }
    }
  );
};

exports.allUser = function (req, res) {
  connection.query(
    `SELECT id, username, nama_lengkap, email, created_at, updated_at, limit_login from "user";`,
    function (error, rows, field) {
      if (error) {
        logger.error("All User : " + error);
      } else {
        var data = rows.rows;
        logger.trace("All User : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.allRole = function (req, res) {
  connection.query(`SELECT * from role;`, function (error, rows, field) {
    if (error) {
      logger.error("All Role : " + error);
    } else {
      var data = rows.rows;
      logger.trace("All Role : " + JSON.stringify(data));
      res.json({ status: "00", message: "Success", data: data });
    }
  });
};

exports.allMenu = function (req, res) {
  connection.query(`SELECT * from menu`, function (error, rows, field) {
    if (error) {
      logger.error("All Menu : " + error);
    } else {
      var data = rows.rows;
      logger.trace("All Menu : " + JSON.stringify(data));
      res.json({ status: "00", message: "Success", data: data });
    }
  });
};

exports.allMenuExcId = function (req, res) {
  var id = req.body.id;

  connection.query(
    `SELECT * from menu WHERE id!=$1`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("All Menu Exc Id : " + error);
      } else {
        var data = rows.rows;
        logger.trace("All Menu Exc Id : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.insertRole = function (req, res) {
  var name = req.body.name;
  var deskripsi = req.body.deskripsi;

  connection.query(
    `SELECT * from role WHERE name = $1;`,
    [name],
    function (error, rows, field) {
      if (error) {
        logger.error("Insert Role : " + error);
      } else {
        if (rows.rows.length > 0) {
          logger.info("Insert Role : Gagal. Terdapat role dengan nama sama.");
          res.json({
            status: "99",
            message: "Gagal. Terdapat role dengan nama sama.",
          });
        } else {
          connection.query(
            `INSERT INTO role (name, deskripsi) VALUES ($1, $2);`,
            [name, deskripsi],
            function (error, rows, field) {
              if (error) {
                logger.error("Insert Role : " + error);
              } else {
                logger.info("Insert Role : Success create role.");
                res.json({ status: "00", message: "Success create role." });
              }
            }
          );
        }
      }
    }
  );
};

exports.deleteUser = function (req, res) {
  var id = req.params.id;

  connection.query(
    `DELETE FROM "user" WHERE id=$1;`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Delete User : " + error);
      } else {
        logger.info("Delete User : Success delete user.");
        res.json({
          status: "00",
          message: "Success delete user.",
        });
      }
    }
  );
};

exports.deleteMenu = function (req, res) {
  var id = req.params.id;

  connection.query(
    `DELETE FROM menu WHERE id=$1;`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Delete Menu : " + error);
      } else {
        logger.info("Delete Menu : Success delete menu");
        res.json({
          status: "00",
          message: "Success delete menu.",
        });
      }
    }
  );
};

exports.deleteRole = function (req, res) {
  var id = req.params.id;

  connection.query(
    `DELETE FROM role WHERE id=$1;`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Delete Role : " + error);
      } else {
        logger.info("Delete Role : Success delete role.");
        res.json({
          status: "00",
          message: "Success delete role.",
        });
      }
    }
  );
};

exports.insertMenu = function (req, res) {
  var label = req.body.label;
  var path = req.body.path;
  var icon = req.body.icon;
  var urutan = req.body.urutan;
  var parent_id = req.body.parent_id;

  connection.query(
    `SELECT * from menu WHERE path = $1;`,
    [path],
    function (error, rows, field) {
      if (error) {
        logger.error("Insert Menu : " + error);
      } else {
        if (rows.rows.length > 0) {
          logger.info(
            "Insert Menu : Gagal. Terdapat menu dengan path yang sama."
          );
          res.json({
            status: "99",
            message: "Gagal. Terdapat menu dengan path yang sama.",
          });
        } else {
          connection.query(
            `INSERT INTO menu (label, path, icon, urutan, parent_id) VALUES ($1, $2, $3, $4, $5);`,
            [label, path, icon, urutan, parent_id],
            function (error, rows, field) {
              if (error) {
                logger.error("Insert Menu : " + error);
              } else {
                logger.info("Insert Menu : Success create menu.");
                res.json({ status: "00", message: "Success create menu." });
              }
            }
          );
        }
      }
    }
  );
};

exports.insertAkses = function (req, res) {
  var id_role = req.body.id_role;
  var id_menu = req.body.id_menu;

  connection.query(
    `SELECT * from akses_role WHERE id_role=$1 AND id_menu=$2;`,
    [id_role, id_menu],
    function (error, rows, field) {
      if (error) {
        logger.error("Insert Akses : " + error);
      } else {
        if (rows.rows.length > 0) {
          connection.query(
            `DELETE from akses_role WHERE id_role=$1 AND id_menu=$2`,
            [id_role, id_menu],
            function (error, rows, field) {
              if (error) {
                logger.error("Insert Akses : " + error);
              } else {
                logger.info("Insert Akses : Success delete permission.");
                res.json({
                  status: "00",
                  message: "Success delete permission.",
                });
              }
            }
          );
        } else {
          connection.query(
            `INSERT INTO akses_role (id_role, id_menu) VALUES ($1, $2);`,
            [id_role, id_menu],
            function (error, rows, field) {
              if (error) {
                logger.error("Insert Akses : " + error);
              } else {
                logger.info("Insert Akses : Success add permission.");
                res.json({ status: "00", message: "Success add permission." });
              }
            }
          );
        }
      }
    }
  );
};

exports.allAssignment = function (req, res) {
  connection.query(
    `SELECT u.id, username, r.name from "user" u LEFT JOIN assignment a ON u.id = a.id_user::int LEFT JOIN role r ON a.id_role::int = r.id`,
    function (error, rows, field) {
      if (error) {
        logger.error("All Assignment : " + error);
      } else {
        var data = rows.rows;
        logger.trace("All Assignment : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.detailAssignment = function (req, res) {
  var id = req.params.id;

  connection.query(
    `SELECT u.id, username, r.name, a.id_role from "user" u LEFT JOIN assignment a ON u.id = a.id_user::int LEFT JOIN role r ON a.id_role::int = r.id WHERE u.id=$1`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Detail Assignment : " + error);
      } else {
        var data = rows.rows;
        logger.trace("Detail Assignment : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.getDetailById = function (req, res) {
  var id = req.params.id;

  connection.query(
    `SELECT username, nama_lengkap, email, created_at, updated_at, limit_login from "user" WHERE id=$1`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Detail By ID : " + error);
      } else {
        logger.trace("Detail By ID : " + JSON.stringify(rows.rows));
        response.ok(rows.rows, "Succes.", res);
      }
    }
  );
};

exports.getMenuById = function (req, res) {
  var id = req.params.id;

  connection.query(
    `SELECT * from menu WHERE id=$1`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.trace("Get Menu By ID : " + error);
      } else {
        var data = rows.rows;
        logger.trace("Get Menu By ID : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.getAksesById = function (req, res) {
  var id = req.params.id;

  connection.query(
    `select m.id, label from akses_role ar left join menu m on ar.id_menu::int = m.id where id_role=$1`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Get Akses By ID : " + error);
      } else {
        var data = rows.rows;
        logger.trace("Get Akses By ID : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.getAksesExcId = function (req, res) {
  var id = req.params.id;

  connection.query(
    `select id, label from menu where id not IN (select id_menu::int from akses_role ar where id_role = $1) and id != 11`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Get Akses Exc ID : " + error);
      } else {
        var data = rows.rows;
        logger.trace("Get Akses Exc ID : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.getRoleById = function (req, res) {
  var id = req.params.id;

  connection.query(
    `SELECT * from role WHERE id=$1`,
    [id],
    function (error, rows, field) {
      if (error) {
        logger.error("Get Role By ID : " + error);
      } else {
        var data = rows.rows;
        logger.trace("Get Role By ID : " + JSON.stringify(data));
        res.json({ status: "00", message: "Success", data: data });
      }
    }
  );
};

exports.editUser = function (req, res) {
  var id = req.body.id;
  var username = req.body.username;
  var nama_lengkap = req.body.nama_lengkap;
  var email = req.body.email;
  var limit_login = req.body.limit_login;

  connection.query(
    `UPDATE "user" set nama_lengkap=$1, email=$2, username=$3, limit_login=$4 WHERE id=$5`,
    [nama_lengkap, email, username, limit_login, id],
    function (error, rows, field) {
      if (error) {
        logger.error("Edit User : " + error);
      } else {
        logger.info("Edit User : Data behasil diupdate.");
        res.json({ status: "00", message: "Data berhasil diupdate!" });
      }
    }
  );
};

exports.editMenu = function (req, res) {
  var id = req.body.id;
  var label = req.body.label;
  var path = req.body.path;
  var icon = req.body.icon;
  var urutan = req.body.urutan;
  var parent_id = req.body.parent_id;

  connection.query(
    `UPDATE menu set path=$1, icon=$2, label=$3, urutan=$4, parent_id=$5 WHERE id=$6`,
    [path, icon, label, urutan, parent_id, id],
    function (error, rows, field) {
      if (error) {
        logger.error("Edit Menu : " + error);
      } else {
        logger.info("Edit Menu : Data berhasil diupdate.");
        res.json({ status: "00", message: "Data berhasil diupdate!" });
      }
    }
  );
};

exports.editRole = function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var deskripsi = req.body.deskripsi;

  connection.query(
    `UPDATE role set deskripsi=$1, name=$2 WHERE id=$3`,
    [deskripsi, name, id],
    function (error, rows, field) {
      if (error) {
        logger.error("Edit Role : " + error);
      } else {
        logger.info("Edit Role : Data berhasil diupdate.");
        res.json({ status: "00", message: "Data berhasil diupdate!" });
      }
    }
  );
};

exports.editAssignment = function (req, res) {
  var id_user = req.body.id_user;
  var id_role = req.body.id_role;

  connection.query(
    `SELECT * from assignment WHERE id_user=$1;`,
    [id_user],
    function (error, rows, field) {
      if (error) {
        logger.error("Edit Assignment : " + error);
      } else {
        if (rows.rows.length > 0) {
          connection.query(
            `UPDATE assignment set id_role=$1 WHERE id_user=$2;`,
            [id_role, id_user],
            function (error, rows, field) {
              if (error) {
                logger.error("Edit Assignment : " + error);
              } else {
                logger.info("Edit Assignment : Data berhasil diupdate.");
                res.json({ status: "00", message: "Data berhasil diupdate!" });
              }
            }
          );
        } else {
          connection.query(
            `INSERT INTO assignment (id_user, id_role) VALUES ($1, $2);`,
            [id_user, id_role],
            function (error, rows, field) {
              if (error) {
                logger.error("Edit Assignment : " + error);
              } else {
                logger.info("Edit Assignment : Data berhasil diupdate.");
                res.json({ status: "00", message: "Data berhasil diupdate!" });
              }
            }
          );
        }
      }
    }
  );
};

exports.getDetailUser = function (req, res) {
  var username = req.params.username;

  connection.query(
    `SELECT username, nama_lengkap, email from "user" WHERE username=$1`,
    [username],
    function (error, rows, field) {
      if (error) {
        logger.error("Get Detail User : " + error);
      } else {
        logger.trace("Get Detail User : " + JSON.stringify(rows.rows));
        response.ok(rows.rows, "Succes.", res);
      }
    }
  );
};

exports.editProfil = function (req, res) {
  var username = req.body.username;
  var nama_lengkap = req.body.nama_lengkap;
  var email = req.body.email;

  connection.query(
    `UPDATE "user" set nama_lengkap=$1, email=$2 WHERE username=$3`,
    [nama_lengkap, email, username],
    function (error, rows, field) {
      if (error) {
        logger.error("Edit Profil : " + error);
      } else {
        logger.info("Edit Profil : Data berhasil diupdate.");
        res.json({ message: "Data berhasil diupdate!" });
      }
    }
  );
};

exports.ubahPassword = function (req, res) {
  var username = req.body.username;
  var old_password = md5(req.body.old_password);
  var unenctrpyt_pass = req.body.new_password;
  var new_password = CryptoJS.AES.encrypt(
    md5(req.body.new_password),
    config.secret
  );

  var lower_regex = unenctrpyt_pass.match(/[a-z]/g);
  var upper_regex = unenctrpyt_pass.match(/[A-Z]/g);
  var number_regex = unenctrpyt_pass.match(/[0-9]/g);

  var count_lower = lower_regex ? lower_regex.length : 0;
  var count_upper = upper_regex ? upper_regex.length : 0;
  var count_number = number_regex ? number_regex.length : 0;

  if (
    count_lower === 0 ||
    count_upper === 0 ||
    count_number === 0 ||
    count_lower + count_upper + count_number < 8
  ) {
    logger.info(
      "Ubah Password : Password baru anda tidak sesuai dengan ketentuan."
    );
    res.json({
      error: "true",
      message: "Password baru anda tidak sesuai dengan ketentuan.",
    });
  } else {
    connection.query(
      `SELECT * from "user" WHERE username=$1`,
      [username],
      function (error, rows, field) {
        if (error) {
          logger.error("Ubah Password : " + error);
        } else {
          var data = rows.rows;
          var decrypted_pass = CryptoJS.AES.decrypt(
            data[0].password,
            config.secret
          );
          var object = decrypted_pass.toString(CryptoJS.enc.Utf8);
          if (old_password === object) {
            connection.query(
              `UPDATE "user" set password=$1 WHERE username=$2`,
              [new_password.toString(), username],
              function (error, rows, field) {
                if (error) {
                  logger.error("Ubah Password : " + error);
                } else {
                  logger.info("Ubah Password : Change password success.");
                  res.json({
                    error: "false",
                    message: "Change password success.",
                  });
                }
              }
            );
          } else {
            logger.info("Ubah Password : Wrong old password.");
            res.json({ error: "true", message: "Wrong old password." });
          }
        }
      }
    );
  }
};

exports.logout = function (req, res) {
  var username = req.body.username;

  connection.query(
    `UPDATE "user" SET last_login=NULL WHERE username=$1`,
    [username],
    function (error, rows, field) {
      if (error) {
        logger.error("Logout : " + error);
      } else {
        logger.info("Logout : Berhasil logout.");
        res.json({
          status: "00",
          message: "Berhasil logout",
        });
      }
    }
  );
};
