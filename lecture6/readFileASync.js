var fs = require('fs');

var onFileLoad = function(err, file){
 console.log("Got the file");
}

console.log("Going to get the file");
fs.readFile('readFileSync.js',onFileLoad);


console.log("App continuess..");