const Joi = require('joi');
const mongoose = require('mongoose');

const genreschema = new mongoose.Schema({
    name : {
     type: String,
     required: true,
     minlength :5,
     maxlength:50
    }
  });

const Genre =mongoose.model('Genre',genreschema);

  // validate genres

const validateGenres = (genre) =>{
    const schema = Joi.object({
           name : Joi.string().min(3).required()
   });
    return schema.validate(genre);
};

module.exports = {
    Genre,
    validateGenres,
    genreschema
}
