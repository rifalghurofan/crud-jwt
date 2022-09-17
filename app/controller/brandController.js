const Brand = require("../models/brand");
const Client = require("../models/client");
const config = require("../config/auth");
const check = require('joi');
var jwt = require("jsonwebtoken");

const readBrand = async (req, res) => {
  Brand.find({})
    .populate('client_id')
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

const createBrand = async (req, res) => {
  // const validated = check.object().keys({
  //   namaBrand: check.string().required()
  // });
  // const { error } = validated.validate(req.body)
  // if (error) {
  //   return res.send({ message: "Cannot send an empty object!" });
  // }


  const ex = req.header('Authorization');
  const token = ex.replace('Bearer ', '');

  const decoded = jwt.verify(token, config.secret)
  Client.findOne({ member_id: decoded.id }, (err, client) => {
    if (err) {
      res.status(500).send({ message: err });
      console.log("error")
    }
    else {
      Brand.findOne({ namaBrand: req.body.namaBrand },
        function (err, brand) {
          if (err) {
            res.status(500).send({ message: err });
          } if (brand) {
            res.status(500).send({ message: req.body.namaBrand + " already added!" });
          } else {
            const create = new Brand({
              namaBrand: req.body.namaBrand,
              client_id: client._id
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
    // create.save((err, result) => {
    //   if (err) {
    //     res.status(500).send({
    //       message: err.message || "Some error occurred while creating the Brand."
    //     });
    //     return;
    //   } else {
    //     res.send(result);
    //   }
    // });

  })


};

const updateBrand = async (req, res) => {
  const validated = check.object().keys({
    namaBrand: check.string().required()
  });
  const { error } = validated.validate(req.body)
  if (error) {
    return res.send({ message: "Cannot send an empty object!" });
  }

  Brand.findOneAndUpdate(
    { _id: req.params.id }, {
    $set: { namaBrand: req.body.namaBrand },
  },
    { new: true },
    (err, result) => {
      if (err) {
        res.send(err);
      } else
        res.send(result);
      res.send({ message: "Brand Update!" });
    }
  );
};

const deleteBrand = async (req, res) => {
  const validated = check.object().keys({
    namaBrand: check.string().required()
  });
  const { error } = validated.validate(req.body)
  if (error) {
    return res.send({ message: "Cannot send an empty object!" });
  }
  Brand.deleteOne(
    { namaBrand: req.body.namaBrand },
    (err, result) => {
      if (err) {
        res.send(err);
      } else
        res.send(result);
    }
  );
};

module.exports = {
  readBrand,
  createBrand,
  updateBrand,
  deleteBrand
}