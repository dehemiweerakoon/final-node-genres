const { User,validateAuth} = require('../models/user');
const express = require("express");
const routes = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

routes.post('/',async(req,res)=>{
    const {error} =  validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid User or password');

    const result = await bcrypt.compare(req.body.password,user.password);
    if(!result) return res.status(400).send('Invalid User or password');

    const token =jwt.sign({__id:user.id},'jwtPrivateKey');

    res.send(token);
});

module.exports = routes