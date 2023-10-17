"use strict";
var auth = require("../middleware/authenticateJWT");

module.exports = function (app) {
  var jsonAuth = require("../middleware/refreshToken");
  var jsonku = require("../controllers/indexController");
  var jsonUser = require("../controllers/userController");

  app.route("/").get(jsonku.index);
  app.route("/refresh").get(auth(), jsonAuth.refresh);
  app.route("/profile/:username").get(auth(), jsonUser.getDetailUser);
  app.route("/listUser").get(jsonUser.allUser);
  app.route("/user/:id").get(jsonUser.getDetailById);
  app.route("/allMenu").get(jsonUser.allMenu);
  app.route("/menu/:id").get(jsonUser.getMenuById);
  app.route("/allRole").get(jsonUser.allRole);
  app.route("/role/:id").get(jsonUser.getRoleById);
  app.route("/allAssignment").get(jsonUser.allAssignment);
  app.route("/assignment/:id").get(jsonUser.detailAssignment);
  app.route("/akses/:id").get(jsonUser.getAksesById);
  app.route("/aksesExc/:id").get(jsonUser.getAksesExcId);

  app.route("/editUser").post(jsonUser.editUser);
  app.route("/allMenuExcId").post(jsonUser.allMenuExcId);
  app.route("/menu").get(jsonUser.menu);
  app.route("/routes").get(jsonUser.routes);
  app.route("/insertMenu").post(jsonUser.insertMenu);
  app.route("/editMenu").post(jsonUser.editMenu);
  app.route("/editRole").post(jsonUser.editRole);
  app.route("/insertRole").post(jsonUser.insertRole);
  app.route("/editAssignment").post(jsonUser.editAssignment);
  app.route("/insertAkses").post(jsonUser.insertAkses);
  app.route("/logout").post(jsonUser.logout);

  app.route("/ubahPassword").put(auth(), jsonUser.ubahPassword);
  app.route("/editProfil").put(auth(), jsonUser.editProfil);

  app.route("/deleteUser/:id").delete(jsonUser.deleteUser);
  app.route("/deleteMenu/:id").delete(jsonUser.deleteMenu);
  app.route("/deleteRole/:id").delete(jsonUser.deleteRole);
};
