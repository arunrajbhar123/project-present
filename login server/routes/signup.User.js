const express = require("express");
const signUpUser = express.Router();

const userValidation = require("../middleware/register/userValidation");
const bCryptPassword = require("../middleware/register/bcryptPassword");
const UserModel = require("../model/user.Model");

signUpUser.post("/", userValidation, bCryptPassword, async (req, res) => {
  const data = req.body;
  const newUser = new UserModel(data);
  await newUser.save();
  res.send({ message: "user registration successfully", status: true });
});

module.exports = signUpUser;
