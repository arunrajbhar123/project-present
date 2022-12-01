const express = require("express");
const signInUser = express.Router();

const loginValidator = require("../middleware/login/loginValidator");
const tokenSign = require("../middleware/login/tokenSign");

signInUser.post("/", loginValidator, tokenSign, async (req, res) => {
  const { token } = req.body;
  res.send({ message: "login successfully", status: true, token });
});

module.exports = signInUser;
