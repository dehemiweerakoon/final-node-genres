const winston = require('winston');
const logger = require('../middleware/logger');
module.exports = function(){
    process.on('uncaughtException',(ex)=>{  // like the errors the not in API calls
        console.log('We got Uncaught exception');
        logger(ex);
        winston.error(ex.message,ex);
        process.exit(1);
    });
    
    process.on('unhandledRejection',(ex)=>{ 
        logger(ex);
        winston.error(ex.message,ex);
        console.log('We got unhandled rejection');
        process.exit(1);
    });
}