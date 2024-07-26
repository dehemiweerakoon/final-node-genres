const genre = require('../Routes/genres');
const customer = require('../Routes/customer');
const movie = require('../Routes/movies');
const rental = require('../Routes/rental');
const user = require('../Routes/user');
const auth = require('../Routes/auth');
const error = require('../middleware/error');
const express = require('express');
module.exports = function (app){
    app.use(express.json());
    app.use('/api/genres',genre);
    app.use('/api/customer',customer);
    app.use('/api/movies',movie);
    app.use('/api/rental',rental);
    app.use('/api/user',user);
    app.use('/api/auth',auth);
    app.use(error);
}