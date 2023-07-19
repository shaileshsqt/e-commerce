const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Ecom", { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
