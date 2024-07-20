const Joi = require('joi');
const mongoose = require('mongoose');
const { unique } = require('underscore');

const User =mongoose.model('User',new mongoose.Schema({
    name :{
        type : String,
        required : true,
        minlength :5,
        maxlength :50
    },
    email :{
        type : String,
        required : true,
        minlength :5,
        maxlength :255,
        unique: true
    },
    password :{
        type : String,
        required : true,
        minlength :8,
        maxlength :1024
    }
}));

  // validate Users

const validateUser = (user) =>{
    const schema = Joi.object({
           name : Joi.string().min(5).max(50).required(),
           email: Joi.string().min(5).max(255).required().email(),
           password : Joi.string().min(5).max(1024).required()
   });
    return schema.validate(user);
};
const validateAuth = (req) =>{
    const schema = Joi.object({
           email: Joi.string().min(5).max(255).required().email(),
           password : Joi.string().min(5).max(1024).required()
   });
    return schema.validate(req);
};

module.exports = {
    User,
    validateUser,
    validateAuth
}
