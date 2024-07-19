const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const Debugger = require('debug')('app:startup');
const genre = require('./Routes/genres');
const mongoose = require ('mongoose');
const customer = require('./Routes/customer');

mongoose.connect('mongodb://127.0.0.1:27017/vidly')  // auto matically create a database
    .then(()=>console.log('Connected to the Database'))
    .catch((error)=>console.log(error));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(express.static('public'));
app.use('/api/genres',genre);
app.use('/api/customer',customer);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    Debugger('Morgan Enabled');
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const PORT = process.env.PORT || 9000;
app.listen(PORT,  () =>{ 
    console.log(`Example app listening on port ${PORT}!`)
    });