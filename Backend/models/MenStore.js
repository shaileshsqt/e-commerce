const mongoose = require("mongoose");

const MenStore = mongoose.Schema({
  title: { type: String },
  image: { type: String },
  img1: { type: String },
  img2: { type: String },
  img3: { type: String },
  img4: { type: String },
  price: { type: Number },
  category: { type: String },
  id: { type: Number },
});

module.exports = mongoose.model("MenStore", MenStore);
