const express = require("express");
const PlanPost = express.Router();
const isAdmin = require("../middleware/isAdmin");
const PlanModel = require("../model/plan.Model");
PlanPost.post("/", async (req, res) => {
  const { name, price, type_month_year, benefits, type } = req.body;
  const save = new PlanModel({
    name,
    price,
    type_month_year,
    benefits,
    type,
  });
  await save.save();
  res.send({ message: "success", status: true });
});

PlanPost.get("/", async (req, res) => {
  const data = await PlanModel.find({});
  res.send({ message: "success", status: true, data });
});

PlanPost.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await PlanModel.deleteOne({ _id: id });
  res.send("delete");
});
module.exports = PlanPost;
