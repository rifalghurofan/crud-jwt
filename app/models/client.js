const mongoose = require("mongoose");
const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    namaClient: String,
    brand_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
      }
    ]
  }, {collection:'Client',
  versionKey: false
})
);
module.exports = Client;