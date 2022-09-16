const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controller/authController");
const User = require("../models/user");
const config = require("../config/auth");
const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = function(app) {
  app.get("/", (req, res)=>{
    res.send("dashboard");
  });
  app.post(
    "/api/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
    );
    app.post("/api/signin", controller.signin);
  };