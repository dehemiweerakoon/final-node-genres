const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function (){
    mongoose.connect('mongodb://127.0.0.1:27017/vidly')  // auto matically create a database
    .then(()=>winston.info('Connected to the Database'))
    .catch((error)=>winston.error(error));
}