const mongoose = require('mongoose');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
  });
  
  
module.exports = function (){
    mongoose.connect('mongodb://127.0.0.1:27017/vidly')  // auto matically create a database
    .then(()=>logger.info('Connected to the Database'))
    .catch((error)=>{logger.error(error);
    });
}