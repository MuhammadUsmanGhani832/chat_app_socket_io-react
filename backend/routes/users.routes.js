const express = require("express");
const auth = require("../middleware/auth");
const { getUserForHome } = require('../controller/users.controller')

const routes = express.Router();

routes.get('/', auth, getUserForHome);

module.exports = routes;