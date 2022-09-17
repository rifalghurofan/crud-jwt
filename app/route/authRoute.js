const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controller/authController");
const path = require('path');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });
  // app.get("/", (req, res) => {
  //   res.send("dashboard");
  // });
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