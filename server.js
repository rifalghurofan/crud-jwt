const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// const cors = require("cors");
const mongoose = require('mongoose');
// const dbConfig = require("./app/config/db");
const db = require("./app/models");
const PORT = process.env.PORT;
const Role = require("./app/models/role");
var morgan = require('morgan');
// var corsOptions = {origin: "http://localhost:27017"};
require("./app/middlewares/auth");
require('dotenv').config();

app.use(morgan('combined'));
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set port, listen for requests
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}.`);});

//configure more
app.use(bodyParser.urlencoded({ extended: false }));

db.mongoose
  .connect(process.env.MONGODB_URI,
    {
      useUnifiedTopology: true, 
      useNewUrlParser: true
    },6000000)
  .then(() => {
    console.log("Successfully connect to MongoDB", mongoose.connection.readyState);
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "super"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'super' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
      new Role({
        name: "member"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'member' to roles collection");
      });
    }
  });
}

// // routes
require('./app/route/authRoute')(app);
require('./app/route/userRoute')(app);
// set port, listen for requests