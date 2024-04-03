const express = require("express");
const { register, signin, logout } = require("../controller/auth.controller.js");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", signin);
router.post("/logout", logout);

module.exports = router;

