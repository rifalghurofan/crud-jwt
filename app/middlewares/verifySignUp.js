const ROLES = require("../models/role");
const User = require("../models/user");
const check = require('joi');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  //validate
  const validated = check.object().keys({ 
    username: check.string().required(),
    email: check.string().required(),
    password: check.string().required() 
  });
  const {error} = validated.validate(req.body)
  if (error){
    return res.send({ message: "Cannot send an empty object!" });
  }else{
    
    // Username
    User.findOne({
      username: req.body.username
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
      
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
        
        next();
      });
    });
  };
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;