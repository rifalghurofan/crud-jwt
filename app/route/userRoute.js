const controllerUser = require("../controller/userController");
const controllerBrand = require("../controller/brandController");
const controllerClient = require("../controller/clientController");
const passport = require("passport");

module.exports = function (app) {
  //read user
  app.get("/api/super/user", passport.authenticate("isSuper", { session: false }), controllerUser.readUser);
  app.get("/api/admin/user", passport.authenticate("isAdmin", { session: false }), controllerUser.readUser);
  app.get("/api/member/user", passport.authenticate("isMember", { session: false }), controllerUser.readUser);

  //crud user
  app.post("/api/super/createUser", passport.authenticate("isSuper", { session: false }), controllerUser.createUser);
  app.post("/api/admin/createUser", passport.authenticate("isAdmin", { session: false }), controllerUser.createUser);
  app.put("/api/super/updateUser/:id", passport.authenticate("isSuper", { session: false }), controllerUser.updateUser);
  app.put("/api/admin/updateUser/:id", passport.authenticate("isAdmin", { session: false }), controllerUser.updateUser);
  app.delete("/api/super/deleteUser", passport.authenticate("isSuper", { session: false }), controllerUser.deleteUser);

  //read client
  app.get("/api/super/client", passport.authenticate("isSuper", { session: false }), controllerClient.readClient);
  app.get("/api/admin/client", passport.authenticate("isAdmin", { session: false }), controllerClient.readClient);
  app.get("/api/member/client", passport.authenticate("isMember", { session: false }), controllerClient.readClient);

  //member crud client
  app.post("/api/member/createClient", passport.authenticate("isMember", { session: false }), controllerClient.createClient);
  app.put("/api/member/updateClient/:id", passport.authenticate("isMember", { session: false }), controllerClient.updateClient);
  app.delete("/api/member/deleteClient", passport.authenticate("isMember", { session: false }), controllerClient.deleteClient);

  //read brand
  app.get("/api/super/brand", passport.authenticate("isSuper", { session: false }), controllerBrand.readBrand);
  app.get("/api/admin/brand", passport.authenticate("isAdmin", { session: false }), controllerBrand.readBrand);
  app.get("/api/member/brand", passport.authenticate("isMember", { session: false }), controllerBrand.readBrand);

  //member crud brand
  app.post("/api/member/createBrand", passport.authenticate("isMember", { session: false }), controllerBrand.createBrand);
  app.put("/api/member/updateBrand/:id", passport.authenticate("isMember", { session: false }), controllerBrand.updateBrand);
  app.delete("/api/member/deleteBrand", passport.authenticate("isMember", { session: false }), controllerBrand.deleteBrand);
};