const express = require("express");
const videoRouter = express.Router();
const isAdmin = require("../middleware/isAdmin");
const VideoModel = require("../model/video.Model");
const videoUpload = require("../middleware/videoupload/videoUpload");

videoRouter.post(
  "/",

  isAdmin,
  videoUpload,
  async (req, res) => {
    const { title, video, description, name, plan_id } = req.body;
    const data = new VideoModel({
      video,
      title,
      description,
      admin_name: name,
      plan_id,
    });
    await data.save();
    res.send({ message: "data save ", status: true });
  }
);

videoRouter.get("/", isAdmin, async (req, res) => {
  const data = await VideoModel.find({}, {});
  res.send({ message: "data success", status: true, data });
});
videoRouter.get("/:id", isAdmin, async (req, res) => {
  const { id, plan_id } = req.params;

  const data = await VideoModel.findOne({ id }, {});

  res.send({ message: "success", status: true, data });
});

module.exports = videoRouter;
