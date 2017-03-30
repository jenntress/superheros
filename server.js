//console.log("YOU GOT IT TO WORK JENN!!"); //smoke test

var express = require('express'); //making our application use this
var Superhero = require('./models/superhero');
var app     = express();

var mongoose = require('mongoose');


//app.METHOD('URL LOCATION', fucntion(req, res){})
mongoose.connect("mongodb://locahost/superheroes");








//Now we're building a little server
var server = app.listen(3000, function(){// takes a port and a "function" to run
  console.log('Server running HURRAY! on PORT 3000');
});
