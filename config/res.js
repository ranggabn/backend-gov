"use strict";

exports.ok = function (values, message, res) {
  var data = {
    status: 200,
    message: message,
    values: values,
    error: null,
  };

  res.json(data);
  res.end();
};
