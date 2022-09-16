const config = require("../config/auth");
const User = require("../models/user");
const check = require('joi'); 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//signup
const signup = async (req, res, err) => {
  //validate
  const validated = check.object().keys({ 
    username: check.string().required(),
    email: check.string().required(),
    password: check.string().required() 
  });
  const {error} = validated.validate(req.body)
  if (error){
    return res.send({ message: "Cannot send an empty object!" });
  }
  
  const pass = req.body.password;
  const salt = bcrypt.genSaltSync(8);
  const defaultRole = ['63181084a943464608078cba'];
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(pass, salt),
    roles: defaultRole
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
}

//signin
const signin = async (req, res, err) => {
  //validate
  const {username, password}= req.body;
  const validated = check.object().keys({ 
    username: check.string().required(),
    password: check.string().required() 
  });
  const {error} = validated.validate(req.body)
  if (error){
    return res.send({ message: "Cannot send an empty object!" });
  }
  
  User.findOne({
    username: username
  })
  .populate("roles")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    //check password match
    var IsValid = bcrypt.compareSync(
      password,
      user.password
      ); 
      if (!IsValid) {
        return res.status(401).send({
          Access_Token: null,
          message: "Invalid Password!"
        });
      }
      //set a token
      var token = jwt.sign({ id: user.id, role: user.roles }, config.secret, {
        expiresIn: "1h" // 24 hours
      });
      //preview roles
      const authorities = user.roles[0].name;

      res.header('Access_Token',token).status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        Access_Token: token
      });
    }); 
  }
  module.exports={
    signup,
    signin
  }