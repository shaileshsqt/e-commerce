const mongoose = require("mongoose");

// Counter ID
const counterSchema = mongoose.Schema({
  _id: { type: String },
  seq: { type: Number },
});

module.exports = mongoose.model("Counter", counterSchema);
