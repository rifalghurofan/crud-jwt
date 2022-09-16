const mongoose = require("mongoose");
const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema({
    namaBrand: String
  }, {collection:'Brand',
  versionKey: false
})
);
module.exports = Brand;