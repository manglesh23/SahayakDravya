const express = require("express");
const mongoose = require("mongoose");
const {connectDatabase} = require("./databaseConnection/databaseConnect");
const {router}=require("./authrouter/authrouter");
require("dotenv").config;

const app = express();
app.use(express.json());
app.use("/",router);
let PORT=8000;
connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening at ${PORT} and database connected`);
    });
  })
  .catch((e) => {
    console.log("Failed server");
  });
