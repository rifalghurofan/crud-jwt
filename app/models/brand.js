const mongoose = require("mongoose");
const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema({
    namaBrand: String,
    client_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
      }
    ]
  }, {
    collection: 'Brand',
    versionKey: false
  })
);
module.exports = Brand;