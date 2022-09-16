const Brand = require("../models/brand");
const check = require('joi');

const readBrand = async (req, res) => {
  User.find({})
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
  const validated = check.object().keys({ 
    namaBrand: check.string().required()
  });
  const {error} = validated.validate(req.body)
  if (error){
    return res.send({ message: "Cannot send an empty object!" });
  }
  
  const create = new Brand({
    namaBrand: req.body.namaBrand
  });
  
  create.save((err, result) =>{
    if (err){
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Brand."
      });
      return;
    }else{
      res.send(result);
      res.send({ message: "Brand Created!" });
    }
  });
};

const updateBrand = async (req, res) => {
  const validated = check.object().keys({
    namaBrand: check.string().required()
  });
  const {error} = validated.validate(req.body)
  if (error){
    return res.send({ message: "Cannot send an empty object!" });
  }
  
  Brand.findOneAndUpdate(
    {_id: req.params.id}, {
      $set: {namaBrand: req.body.namaBrand},
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
    const {error} = validated.validate(req.body)
    if (error){
      return res.send({ message: "Cannot send an empty object!" });
    }
    Brand.deleteOne(
      {namaBrand: req.body.namaBrand},
      (err, result) => {
        if (err) {
          res.send(err);
        } else 
        res.send(result);
      }
      );
    };
    
    module.exports={
      readBrand,
      createBrand,
      updateBrand,
      deleteBrand
    }