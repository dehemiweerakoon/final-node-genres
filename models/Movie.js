const Joi = require('joi');
const mongoose = require('mongoose');
const {genreschema} = require('./genres');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title:{
    type : String,
    required: true,
    trim : true,
    minlength :5,
    maxlength:255
  },
  genre:{
    type : genreschema,
    required : true
  },
  numberInStock:{
    type : Number,
    required : true,
    min: 0,
    max: 255
  },
  dailyRentalPrice:{
    type : Number,
    required : true,
    min: 0,
    max: 255
  },
  img :{
    type: String
  }
}));

const validateMovie = (movie)=>{
  const schema = Joi.object({
    title : Joi.string().min(5).max(50).required(),
    genreId : Joi.objectId().required(),
    numberInStock : Joi.number().min(0).required(),
    dailyRentalPrice : Joi.number().min(0).required()
  });
  return schema.validate(movie);
}

module.exports= {
    Movie,
    validateMovie
}

