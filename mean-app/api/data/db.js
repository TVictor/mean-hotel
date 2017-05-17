var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dbUrl);

mongoose.connection.on('connected',function(){
    console.log("Mongoose connected to "+ dbUrl );
});

mongoose.connection.on('disconnected',function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on('error',function(err){
    console.error("Mongoose error "+ err );
});