const express = require("express");
const AddDataRoute = express.Router();

const DataModel = require("../Models/DataModel");

AddDataRoute.post("/", async (req, res) => {
  const data = req.body;
  const newData = new DataModel(data);
  await newData.save();
  res.send({ status: "done", newData });
});



module.exports = AddDataRoute;
