const mongoose = require("mongoose");
const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    namaClient: String,
    member_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  }, {
    collection: 'Client',
    versionKey: false
  })
);
module.exports = Client;