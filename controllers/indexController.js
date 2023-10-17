"use strict";

var response = require("../config/res");
var logger = require("../config/log");

exports.index = function (req, res) {
  logger.info("Aplikasi berjalan");
  response.ok([], "Aplikasi berjalan", res);
};
