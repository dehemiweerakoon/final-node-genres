const express = require('express');
const routes = express.Router();
const Joi = require('joi');
const { indexOf } = require('underscore');
const genres = [
    { id : 1 , name : "Action"},
    { id : 2 , name : "Horror"},
    { id : 3 , name : "Romance"}
];

routes.get('/',(req,res)=>{
   res.send(genres);
});

routes.get('/:id',(req,res)=>{
  const genre = genres.find((genre)=>genre.id===parseInt(req.params.id));
  if(genre){
    res.send(genre);
  }else{
    res.status(404).send("Course with id not Found");
  }
});

routes.post('/',(req,res)=>{
    // validate whether the data is correct or not
    const {error} = validateGenres(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        id : genres.length + 1 ,
        name : req.body.name
    }
    // if the validation is correct then create a new genre
    genres.push(genre);
    res.send(genre);

});

routes.put('/:id',(req,res)=>{  
    // check whether given id have data 
    const  genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with ID not found");
    // validate the input
    const {error} = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // update the course
    genre.name = req.body.name;
    res.send(genre); //send the updated genre
});

routes.delete('/:id',(req,res)=>{
    // Look up find the  genre
    const  genre = genres.find((genre)=>genre.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("The genre with ID not found");

    // delete genre
    const index  = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});


// validate genres

const validateGenres = (genre) =>{
     const schema = Joi.object({
            name : Joi.string().min(3).required()
    });
     return schema.validate(genre);
};

module.exports = routes ;