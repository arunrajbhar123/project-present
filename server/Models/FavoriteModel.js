const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  data_id: { type: String },
});

const FavoriteModel = mongoose.model("favorite", FavoriteSchema);

module.exports = FavoriteModel;
