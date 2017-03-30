//console.log("YOU GOT IT TO WORK JENN!!"); //smoke test

var express = require('express'); //making our application use this
var Superhero = require('./models/superhero');
var app     = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//app.METHOD('URL LOCATION', fucntion(req, res){})
mongoose.connect("mongodb://127.0.0.1:27017/superheroes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/superheroes', function(req, res){
   Superhero.find(function(err, data){
     if(err){
       console.log(err);
     } else {
       res.json(data);
     }
   });
});

app.post('/superheroes', function(req, res){
  var newSuper = new Superhero({
    name:       req.body.name,
    superPower: req.body.superPower,
    universe:   req.body.universe,
    evil:       req.body.evil,
    rank:       req.body.rank,
  });
  newSuper.save(function(err, sh){
    if(err){
      console.log(err)
    } else {
      res.json(sh)
    }
  });
  newSuper.save(function(err, sh){
    if(err){
      console.log(err)
    } else {
      res.json(sh)
    }
  });
})

app.get('/superheroes/:superhero_id', fucntion(req, res){
  Superhero.findById(req.params.superhero_id)
});








//testing to see if mongo is working
app.post("/test", function(req, res){
  res.send(req.body);
});

//Now we're building a little server
var server = app.listen(3000, function(){// takes a port and a "function" to run
  console.log('Server running HURRAY! on PORT 3000');
});
