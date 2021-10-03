const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost:27017/${env.db}`); //backtick is used now

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;