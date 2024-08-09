const express = require('express');
const routes = express.Router();
const {Genre,validateGenres} = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

routes.get('/',asyncMiddleware(async(req,res)=>{
  const genres = await Genre.find().sort('name');
  res.send(genres);
}));

routes.get('/:id',asyncMiddleware(async(req,res)=>{
      const genre = await Genre.findById(req.params.id);
      if(genre){
        res.send(genre);
      }else{
        res.send('The genre with ID not Found');
      }
 
}));// 

routes.post('/',auth,asyncMiddleware(async(req,res)=>{
    // validate whether the data is correct or not
    const {error} = validateGenres(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    let genre = new Genre ({name : req.body.name});
    // if the validation is correct then create a new genre
    genre = await genre.save();
    res.send(genre);

}));

routes.put('/:id',auth,asyncMiddleware(async(req,res)=>{ 

    const {error} = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
   
    if(!genre) return res.status(404).send("The genre with ID not found");

    res.send(genre); //send the updated genre
}));

routes.delete('/:id',[auth,admin],asyncMiddleware(async(req,res)=>{
   
    const  genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send("The genre with ID not found");

    res.send(genre);
}));


module.exports = routes ;