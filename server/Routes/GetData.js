const express = require("express");
const GetDataRoute = express.Router();

const DataModel = require("../Models/DataModel");
const FavoriteModel = require("../Models/FavoriteModel");

GetDataRoute.post("/", async (req, res) => {
  const { page } = req.query;
  const payload = req.body;

  var data = await DataModel.find(payload)
    .skip(page > 0 ? (page - 1) * 20 : 0)
    .limit(20);

  if (payload?.price) {
    const [a, b] = payload.price.split("-");
    const newData = [];
    const check = data.map((el) => {
      if (
        Number(el.currency.split("$")[1]) >= a &&
        Number(el.currency.split("$")[1]) <= b
      ) {
        newData.push(el);
      }
    });

    data = newData;
  }

  res.send(data);
});

GetDataRoute.post("/favorite", async (req, res) => {
  const { data_id, status } = req.body;
  if (status) {
    const check = await FavoriteModel.findOne({ data_id });
    if (!check) {
      const newFavorite = new FavoriteModel({ data_id });
      await newFavorite.save();
    }
  } else {
    const check = await FavoriteModel.deleteOne({ data_id });
  }

  const update = await DataModel.updateOne(
    { data_id },
    { $set: { favorite: status } }
  );

  res.send({ status: true });
});

GetDataRoute.get("/favorite", async (req, res) => {
  const a = await FavoriteModel.find({});
  const b = await DataModel.find({});
  const data = [];
  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        if (object2.id == object1.data_id) {
          data.push(object2);
        }
      });
    });
  }
  getDifference(a, b);

  res.send(data);
});

module.exports = GetDataRoute;

const makeDateFormate = (createdAt) => {
  const date = `${createdAt}`;
  console.log(date);
  // return (
  //   date?.split("T")[0].split("-")[2] /
  //   date?.split("T")[0].split("-")[1] /
  //   date?.split("T")[0].split("-")[0]
  // );
};
