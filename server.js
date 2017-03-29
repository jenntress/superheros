//console.log("YOU GOT IT TO WORK JENN!!"); //smoke test

var express = require('express'); //making our application use this
var app     = express();

//app.METHOD('URL LOCATION', fucntion(req, res){})

app.get('/test', function(req,res){
  res.send("You found the test route!");
}); //need to go to http://localhost:3000 on the browser to see if this works.

//Now we're building a little server
var server = app.listen(3000, function(){// takes a port and a "function" to run
  console.log('Server running HURRAY! on PORT 3000');
});
