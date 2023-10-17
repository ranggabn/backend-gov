const jwt = require("jsonwebtoken");
const config = require("../config/params");
// var logger = require("../config/log");

function verifikasi() {
  return function (req, res, next) {
    //cek authorizzation header
    var tokenWithBearer = req.headers.authorization;

    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];

      //verifikasi
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          //logger.info("Verifikasi : Token tidak valid.");
          return res
            .status(401)
            .send({ auth: false, message: "Token tidak valid." });
        } else {
          req.auth = decoded;
          next();
        }
      });
    } else {
      //logger.info("Verifikasi : Token tidak tersedia.");
      return res
        .status(401)
        .send({ auth: false, message: "Token tidak tersedia." });
    }
  };
}

module.exports = verifikasi;
