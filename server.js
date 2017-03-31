//console.log("YOU GOT IT TO WORK JENN!!"); //smoke test

var express = require('express'); //making our application use this
var Superhero = require('./models/superhero');
var Villian = require('./models/villian');
var app     = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//app.METHOD('URL LOCATION', fucntion(req, res){})
mongoose.connect("mongodb://127.0.0.1:27017/superheroes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//************VILLIANS***********************************
//GET - returns all Villians from the database (Crud)
app.get('/villians', function(req, res){
  Villian.find(function(err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

//POST - creates and saves a new villian entered into Postman (cRud)
app.post('/villians', function(req, res){
  var newVill = new Villian({
    name: req.body.name,
    evilPower: req.body.evilPower,
    evil: req.body.evil,
    nemesis: req.body.nemesis
  });
  newVill.save(function(err, vill){
    if(err){
      console.log(err)
    } else {
      res.json(vill)
    }
  });
});

//DELETE - allows you to delete an entry from the database (cruD)
app.delete('/villians/:villian_id', function(req, res){

  Villian.remove({_id: req.params.villian_id}, function(err){ // we're not expecting data back, so we don't need res
    if(err){
      console.log(err);
    }else {
      res.send("Bad guy deleted!")
    }
  });
});

//********************SUPERHEROES***********************************
// returns all Superheroes from the database
app.get('/superheroes', function(req, res){
   Superhero.find(function(err, data){
     if(err){
       console.log(err);
     } else {
       res.json(data);
     }
   });
});

//get and post methods are creating an API for us so that we can interact with the database
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
});

app.get('/superheroes/:superhero_id', function(req, res){
  Superhero.findById(req.params.superhero_id, function(err, gftq){
    if(err){
      console.log(err)
    }else {
      res.json(gftq)
    }
  });
});

//app.delete - we can use the same URL because we're using a different method
app.delete('/superheroes/:superhero_id', function(req, res){

  Superhero.remove({_id: req.params.superhero_id}, function(err){ // we're not expecting data back, so we don't need res
    if(err){
      console.log(err);
    }else {
      res.send("Super hero deleted!")
    }
  });
});



//************BACK CODE TO KEEP AT THE END***********************************
//testing to see if mongo is working
app.post("/test", function(req, res){
  res.send(req.body);
});
//Now we're building a little server
var server = app.listen(3000, function(){// takes a port and a "function" to run
  console.log('Server running HURRAY! on PORT 3000');
});
