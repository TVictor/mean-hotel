require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


var routes = require('./api/routes');

app.set('port',3000);

app.use(function(req,res, next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended : false}));

app.use('/api',routes);

var listener = app.listen(app.get('port'), function(){
    var port = listener.address().port;
    console.log("Listening on port "+port);
    
});


