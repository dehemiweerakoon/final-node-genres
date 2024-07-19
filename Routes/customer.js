const express = require('express');
const routes = express.Router();
const Joi = require('joi');
const {Customer,validate} = require('../models/customer');

routes.get('/',async(req,res)=>{
  try {
    const customer = await Customer.find();
    res.send(customer);
  } catch (error) {
    res.send(error.message);
  }
 
});

routes.get('/:id',async(req,res)=>{
   try {
     const customer = await Customer.findById(req.params.id); 
     if(customer) res.send(customer);
   } catch (error) {
     res.status(404).send('Customer with id not found');
   }
});

routes.post('/',async(req,res)=>{ 
   const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   try {
        let customer = new Customer({
            name : req.body.name,
            isGold : req.body.isGold,
            phone : req.body.phone
          });
          
          await customer.validate();

          customer = await customer.save();
          res.send(customer);
   }catch(error){
        res.send(error.message);
   }
   
});

routes.put('/:id',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
         const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
          name:req.body.name,
         isGold :req.body.isGold,
         phone: req.body.phone
        },{new:true});
        
       if(!customer) return res.status(404).send('Customer with id not found');

       res.send(customer);
    }catch(error){
      res.send(error.message);
    }

   
});

routes.delete('/:id',async(req,res)=>{
    const customer = await Customer.findOneAndDelete(req.params.id);
    if(!customer) return res.status(404).send('Customer with given id not found');

    res.send(customer);
})


module.exports = routes;