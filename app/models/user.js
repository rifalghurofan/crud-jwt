const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, unique: true},
    email: { type: String, unique: true},
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  }, {collection:'User',
  versionKey: false
})
);
module.exports = User;