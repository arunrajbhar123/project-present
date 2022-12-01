const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
  user_id: { type: String },
  group: { type: [] },
});
const GrounpModel = mongoose.model("group", groupSchema);
module.exports = GrounpModel;
