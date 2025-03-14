const express = require("express");
const routes = express.Router();
const { Rental,validateRental} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/Movie');
const auth = require('../middleware/auth');
// const Fawn = require('fawn')

// Fawn.init(mongoose);

routes.get('/',async(req,res)=>{  
    const rental = await Rental.find().sort('-dateOut'); //decending order
    res.send(rental);
});

routes.post('/',auth,async(req,res)=>{
   
     const {error} = validateRental(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const customer = await Customer.findById(req.body.customerId);
     if(!customer) return res.status(400).send('Customer is not found with given ID ');

     const movie = await Movie.findById(req.body.movieId);
     if(!movie) return res.status(400).send('Movie with that id not found');

     if(movie.numberInStock ===0) return res.status(400).send('Movie is not in stock');

     let rental = new Rental({
        customer : {
            _id :customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title :movie.title,
            dailyRentalPrice : movie.dailyRentalPrice
        }
     });
    
     // new Fawn.Task()
     //  .save('rentals',rental);
     //  .update('movies',{_id:movie:id},{$inc:{numberInstock:-1}}).run();
     
     rental = await rental.save();
     movie.numberInStock--;
     movie.save();
     res.send(rental);
});

routes.put('/:id',auth,async (req,res)=>{
    const rental = await Rental.findById(req.params.id);

    if(!rental) return res.status(404).send('Rental with the Id not found');

     const customer = await Customer.findById(req.body.customerId);
     if(!customer) return res.status(400).send('Customer is not found with given ID ');

     const movie = await Movie.findById(req.body.movieId);
     if(!movie) return res.status(400).send('Movie with that id not found');

     rental.set({
        customer : {
            _id :customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title :movie.title,
            dailyRentalPrice : movie.dailyRentalPrice
        }
     });
    rental = rental.save();
    res.send(rental);
});

routes.delete('/:id',auth,async (req,res)=>{
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if(!rental) return res.status(404).send('Given rental not found');

    res.send(rental);
})

routes.get('/:id',async(req,res)=>{
    const rental = await Rental.findById({_id:req.params.id});
    if(!rental) return res.status(404).send('Not found the rental with the Id');
})

routes.get('/byCustomer/:id',async(req,res)=>{
    const rental = await Rental.find({'customer._id':req.params.id});
    res.send(rental);
})

module.exports = routes;