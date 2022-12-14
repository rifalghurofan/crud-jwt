const check = require('joi');
const Client = require("../models/client");
const config = require("../config/auth");
var jwt = require("jsonwebtoken");

const readClient = async (req, res) => {
  Client.find({})
    .populate('member_id')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const createClient = async (req, res) => {
  // const validated = check.object().keys({
  //   namaClient: check.string().required(),
  //   brand_id: check.string().required()
  // });
  // const { error } = validated.validate(req.body)
  // if (error) {
  //   return res.send({ message: "Cannot send an empty object!" });
  // }

  const ex = req.header('Authorization');
  const token = ex.replace('Bearer ', '');

  const decoded = jwt.verify(token, config.secret)
  Client.findOne({ member_id: decoded._id }, (err, client) => {
    if (err) {
      res.status(500).send({ message: err });
      console.log("error")
    }
    if (client) {
      res.status(404).send({ message: "You are has been create Client!" });
    }
    else {
      Client.findOne({ namaClient: req.body.namaClient },
        function (err, user) {
          if (err) {
            res.status(500).send({ message: err });
          } if (user) {
            res.status(500).send({ message: req.body.namaClient + " already added!" });
          } else {
            const create = new Client({
              namaClient: req.body.namaClient,
              member_id: decoded.id
            });

            create.save(function (err, result) {
              if (err) {
                res.status(500).send({
                  message: err.message || "Some error occurred while creating the Brand."
                });
                return;
              } else {
                res.status(500).send(result);
              }
            })
          }
        })
    }
  })
};

const updateClient = async (req, res) => {
  const validated = check.object().keys({
    _id: check.string().required()
  });
  const { error } = validated.validate(req.params)
  if (error) {
    return res.send({ message: "Cannot send an empty object!" });
  }
  Client.findOneAndUpdate(
    { _id: req.params.id }, {
    $set: {
      namaClient: req.body.namaClient,
      brand_id: req.body.brandId
    },
  },
    { new: true },
    (err, result) => {
      if (err) {
        res.send(err);
      } else
        res.send(result);
      res.send({ message: "Client Update!" });
    }
  );
};

const deleteClient = async (req, res) => {
  const validated = check.object().keys({
    namaClient: check.string().required()
  });
  const { error } = validated.validate(req.body)
  if (error) {
    return res.send({ message: "Cannot send an empty object!" });
  }
  Client.deleteOne(
    { namaClient: req.body.namaClient },
    (err, result) => {
      if (err) {
        res.send(err);
      } else
        res.send(result);
    }
  );
};

module.exports = {
  readClient,
  createClient,
  updateClient,
  deleteClient
}