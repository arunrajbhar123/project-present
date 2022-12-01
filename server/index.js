const express = require("express");
const cors = require("cors");
const app = express();

const Connection = require("./Config/db");
const DataModel = require("./Models/DataModel");
const AddDataRoute = require("./Routes/AddData");
const GetDataRoute = require("./Routes/GetData");

app.use(express.json());
app.use(cors());
require("dotenv").config();


app.use("/postdata", AddDataRoute);
app.use("/getdata", GetDataRoute);

app.listen(process.env.PORT, async () => {
  try {
    await Connection;
    console.log("database connected");
  } catch {
    console.log("database connection failed!");
  }
  console.log("server is running on PORT:", process.env.PORT);
});
