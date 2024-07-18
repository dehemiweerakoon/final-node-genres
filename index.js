const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const Debugger = require('debug')('app:startup');
const genre = require('./Routes/genres');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(express.static('public'));
app.use('/api/genres',genre);

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