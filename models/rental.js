const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer :{
        type : new mongoose.Schema({
            name :{
                type :String,
                required:true,
                minlength :3,
                maxlength :50
            },
            isGold : {
                type : Boolean,
                default : false,
            },
            phone :{
                type :String ,
                required : true,
                minlength: 5,
                maxlength :50
            }
        }),
        required : true
    },
    movie : {
        type : new mongoose.Schema({
            title :{
                type:String,
                required :true,
                trim : true,
                minlength :5 ,
                maxlength:255
            },
            dailyRentalPrice :{
                type: Number,
                required : true,
                min:0,
                max: 255
            }
        }),
        required : true
    },
    dateOut:{
        type: Date,
        required : true,
        default : Date.now
    },
    dateReturned : {
        type: Date
    },
    rentalFee :{
        type: Number ,
        min : 0
    }
}))


// Here we need to implement a method to validate the retal price 

function validateRental(rental){
     const schema = Joi.object({
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
     })
     return schema.validate(rental);
}

module.exports = {
    Rental,
    validateRental
}