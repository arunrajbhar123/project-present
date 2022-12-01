const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  plan_id: { type: String },
  user_id: { type: String },
});
const PurchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = PurchaseModel;
