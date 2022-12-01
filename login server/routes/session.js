const express = require("express");
const session = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.Model");

session.get("/", async (req, res) => {
  const { token } = req.headers;

  jwt.verify(token, "codiis", async function (err, email) {
    if (err) {
      return res.send({ message: "something is wrong", status: false });
    } else {
      const data = await UserModel.findOne(
        { email },
        {
          _id: 0,
          __v: 0,
          password: 0,
        }
      );

      res.send({ message: "success", data, status: true });
    }
  });
});

module.exports = session;
