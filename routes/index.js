var express = require("express");
var auth = require("../middleware/auth");
var router = express.Router();

router.post("/api/register", auth.reqistrasi);
router.post("/api/login", auth.login);

module.exports = router;
