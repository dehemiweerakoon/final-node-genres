const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const Debugger = require('debug')('app:startup'); //$env:DEBUG="app:startup"
const genre = require('./Routes/genres');
const mongoose = require ('mongoose');
const customer = require('./Routes/customer');
const movie = require('./Routes/movies');
const rental = require('./Routes/rental');
const Joi = require('joi');
Joi.objectId =require('joi-objectid')(Joi);
const user = require('./Routes/user');
const auth = require('./Routes/auth');
const config = require('config');
const error = require('./middleware/error');
require('express-async-errors');


if(!config.get('jwtPrivateKey')){
    console.error('Fatel error'); //$env:vidly_jwtPrivateKey="myprivateKey"
    process.exit(1); //error
}

mongoose.connect('mongodb://127.0.0.1:27017/vidly')  // auto matically create a database
    .then(()=>console.log('Connected to the Database'))
    .catch((error)=>console.log(error));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    Debugger('Morgan Enabled');
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(express.static('public'));
app.use('/api/genres',genre);
app.use('/api/customer',customer);
app.use('/api/movies',movie);
app.use('/api/rental',rental);
app.use('/api/user',user);
app.use('/api/auth',auth);
app.use(error);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const PORT = process.env.PORT || 9000;
app.listen(PORT,  () =>{ 
    console.log(`Example app listening on port ${PORT}!`)
    });