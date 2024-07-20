const { User,validateUser} = require('../models/user');
const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');

routes.post('/',async(req,res)=>{
    const {error} =  validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User Already registerd');
    user = new User(_.pick(req.body,['name','email','password']));
        try {
            await user.save();     
            res.send(_.pick(user,['name','email','_id']));
        } catch (error) {
            res.status(500).send(error.message);
        }
 
})


module.exports = routes