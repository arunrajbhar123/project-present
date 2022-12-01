const express = require("express");
const friendRoute = express.Router();
const isAdmin = require("../middleware/isAdmin");
const UserModel = require("../model/user.Model");
friendRoute.get("/", isAdmin, async (req, res) => {
  const users = await UserModel.find({});
  const data = [];
  users.map((el) => {
    data.push({ firstname: el.firstname, lastname: el.lastname });
  });
  res.send({ message: "success", status: true, data });
});

friendRoute.patch("/", isAdmin, async (req, res) => {
  const { email, firstname, name, remove } = req.body;
  // console.log(firstname, "sf");
  const { friends } = await UserModel.findOne({ email });
  console.log(friends);
  var update;
  if (remove == false) {
    update = await UserModel.updateOne(
      { email },
      {
        $push: { friends: firstname },
      }
    );
  } else {
    upldate = await UserModel.updateOne(
      { email },
      { $pull: { friends: firstname } }
    );
  }
 
  res.send("hi friend");
});
module.exports = friendRoute;
