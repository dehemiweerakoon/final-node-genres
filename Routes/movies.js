const express = require("express");
const routes = express.Router();
const { Movie, validateMovie } = require("../models/Movie");
const { Genre } = require("../models/genres");
const auth = require('../middleware/auth');

routes.get("/", async (req, res) => {
    const movies = await Movie.find().sort("name");
    res.send(movies);
});

routes.post("/", auth,async (req, res) => {
    //
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message+":");

    const genre = await Genre.findById(req.body.genreId);

    if (!genre) return res.status(404).send("Invalid Genre");

    try {
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre.id,
                name: genre.name,
            },
            numberInStock: req.body.numberInStock,
            dailyRentalPrice: req.body.dailyRentalPrice,
        });
        movie = await movie.save();
        res.send(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

routes.get('/:id',async(req,res)=>{
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

routes.put('/:id',auth,async(req,res)=>{

    const {error} = validateMovie(req.body);
    if(error) return res.send(400).send(error.details[0].message);

    let movie = await Movie.findById(req.params.id);

    if(!movie) return res.send(404).send('Given Id don;t have any movie');

    // after movie insert if customer want to change genre
    
       const genre = await Genre.findById(req.body.genreId);
       if(!genre) return res.status(404).send('Given genre not found');
     
       movie.set({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalPrice: req.body.dailyRentalPrice,
       });
       const result=await movie.save();
       res.send(result);
});

routes.delete('/:id',auth,async(req,res)=>{
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if(!movie) return res.status(404).send('The movie not found');

        // 
        res.send(movie);
    } catch (error) {
        res.send(error.message);
    } 
});
routes.get('/ByGenre/:id',auth,async(req,res)=>{
    try {
        const movies = await Movie.find({'genre._id':req.params.id});
        if(!movies) return res.status(404).send('The movie not found');

        // 
        res.send(movies);
    } catch (error) {
        
    }
})

module.exports = routes;

