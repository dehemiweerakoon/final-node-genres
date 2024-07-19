const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer',new mongoose.Schema({
    name :{
        type: String,
        required : true,
        minlength: 5,
        maxlength: 50
    },
    isGold :{
        type: Boolean,
        default : false,
    },
    phone : {
       type: String,
       required: true,
       minlength:5,
       maxlength:50
    }
}));

const validateCustomer = (genre) =>{
    const schema = Joi.object({
           name : Joi.string().min(3).required(),
           isGold : Joi.boolean().required(),
           phone : Joi.string().max(20).required(),
   });
    return schema.validate(genre);
};

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;