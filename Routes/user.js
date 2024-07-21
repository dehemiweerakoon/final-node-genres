const { User,validateUser} = require('../models/user');
const express = require("express");
const routes = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth');

routes.post('/',async(req,res)=>{
    const {error} =  validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User Already registerd');

    user = new User(_.pick(req.body,['name','email','password']));

    const salt= await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password,salt);
        try {
            await user.save();     
            const token = user.generateAuthToken();       
            res.header('x-auth-token',token).send(_.pick(user,['name','email','_id']));
            
        } catch (error) {
            res.status(500).send(error.message);
        }
    ///infromation expert system
})

routes.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    //console.log(user);
    res.send(user);
});

module.exports = routes