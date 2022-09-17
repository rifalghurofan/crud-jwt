const User = require("../models/user");
const Role = require("../models/role");
var bcrypt = require("bcryptjs");
const check = require('joi');

//create user
const readUser = async (req, res) => {
  const thisUser = req.header('Authorization')
  console.log(thisUser)
  User.find({})
    .populate("roles")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

const createUser = async (req, res) => {
  //validate
  const validated = check.object().keys({
    username: check.string().required(),
    email: check.string().required(),
    password: check.string().required()
  });
  const { error } = validated.validate(req.body)
  if (error) {
    return res.send({ message: err });
  }

  const pass = req.body.password;
  const salt = bcrypt.genSaltSync(8);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(pass, salt)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User already registered!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User Added!" });
        });
      });
    }
  });
};

//update user
const updateUser = async (req, res) => {
  //validate
  const validated = check.object().keys({
    username: check.string().required(),
    email: check.string().required(),
    password: check.string().required(),
  });
  const { error } = validated.validate(req.body)
  if (error) {
    return res.send({ message: err });
  }

  const pass = req.body.password;
  const salt = bcrypt.genSaltSync(8);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(pass, salt)
  });

  const { username, email } = req.body
  User.findOneAndUpdate(
    { _id: req.params.id }, { user },
    { new: true },
    (err, result) => {
      if (err) {
        res.send(err);
      } else

        res.send(result);
      res.send({ message: "User Updated!" });
    }
  )
    .populate('roles')
};

//delete user
const deleteUser = async (req, res) => {
  User.deleteOne(
    { username: req.body.username },
    (err, result) => {
      if (err) {
        res.send(err);
      } else
        res.send(result);
      res.send({ message: "User Deleted!" });
    }
  );
};

module.exports = {
  readUser,
  createUser,
  updateUser,
  deleteUser
}