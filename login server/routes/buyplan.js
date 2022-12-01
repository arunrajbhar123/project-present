const express = require("express");
const planBuy = express.Router();
const UserModel = require("../model/user.Model");
planBuy.post("/", async (req, res) => {
  const plan_id = req.body;
  const data = await UserModel.updateOne(plan_id);
  res.send({ message: "plan successfully buy", status: true });
});
module.exports = planBuy;
