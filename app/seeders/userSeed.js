const mongoose = require('mongoose');
const User = require("../models/user");
const db = require("../models");
require('dotenv').config();

var bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(8);
const rol = ['63181084a943464608078cb8'];

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
    
    function initial(){
        User.findOne({username: "superadmin"}, (err, user) => {
            if (err) {
                console.log("error", err);
            }if (user) {
                console.log("Superadmin already!")
            } else{
                const create = new User ({
                    username: "superadmin",
                    email: "superadmin@gmail.com",
                    password: bcrypt.hashSync("12345678", salt),
                    roles: rol
                })
                create.save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("Superadmin added succesfully!");
                });
            }
        })
    };