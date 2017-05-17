var mongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

var open = function(){
    //set connection
    mongoClient.connect(dbUrl,function(err,db){
        if(err){
            console.error("DB Connection failed");
            return;
        }
        _connection = db;
      //  console.log("DB Connection open", db);
    });
};

var get = function(){
    return _connection;
};

module.exports = {
    open : open,
    get : get
};