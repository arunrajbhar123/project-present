const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  video: { type: String },
  title: { type: String },
  description: { type: String },
  view: { type: Number },
  admin_name: { type: String },
  plan_id: { type: String },
});
const VideoModel = mongoose.model("video", videoSchema);
module.exports = VideoModel;
