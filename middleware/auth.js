const jwt = require('jsonwebtoken');
const config = require('config');
const express = require("express");
const routes = express.Router();

module.exports =function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).send('Acess Denied no token provided');
   
    try {
        const decode = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decode; // get the payload
        //console.log(decode);
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).send('Invalid token');
    }
}
