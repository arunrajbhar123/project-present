const mongoose = require("mongoose");
const planSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  type_month_year: { type: String },
  benefits: { type: [] },
  type: { type: String },
});
const PlanModel = mongoose.model("plandetails", planSchema);
module.exports = PlanModel;
