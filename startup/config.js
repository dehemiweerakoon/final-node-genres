const config = require('config');

module.exports=function() {
    if(!config.get('jwtPrivateKey')){
        throw new Error('Fatel error jwtPrivateKey not specified'); //$env:vidly_jwtPrivateKey="myprivateKey"
    }
}