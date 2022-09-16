const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;

const db = mongoose.connect(process.env.MONGODB_URI);
db.mongoose = mongoose;
db.user = require("./user");
db.client = require("./client");
db.brand = require("./brand");
db.role = require("./role");
db.roles = ["super", "admin", "member"];
module.exports = db;