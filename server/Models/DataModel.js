const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    name: { type: String },
    postalZip: { type: String },
    address: { type: String },
    region: { type: String },
    numberrange: { type: String },
    country: { type: String },
    list: { type: String },
    image: { type: String },
    type: { type: String },
    details: { type: [] },
    currency: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const DataModel = mongoose.model("data", DataSchema);

module.exports = DataModel;
