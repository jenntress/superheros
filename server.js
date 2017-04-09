//console.log("YOU GOT IT TO WORK JENN!!"); //smoke test

var express    = require('express'); //making our application use this
var path       = require('path');
var Superhero  = require('./models/superhero');
var Villain    = require('./models/villain');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


//app.METHOD('URL LOCATION', fucntion(req, res){})
mongoose.connect("mongodb://127.0.0.1:27017/superheroes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));//tells express that all files inside the public folder are client-side "static code"

app.set('view engine', 'ejs'); //telling node to use ejs "ejs middleware"
app.set('views', path.join(__dirname, 'views'));//now telling node where the ejs is - and use this directory

app.get('/', function(req, res){ //this forces localhost:3000 to print index.ejs
  res.render('index')
});

app.get('/heroes', function(req, res){ //when the browser gets 3000/heroes... is pulls the goodGuys.ejs
  res.render('goodGuys');
});

app.get('/villains', function(req, res){ //when the browser gets 3000/bad... is pulls the badGuys.ejs
  res.render('badGuys');
});


//************VILLAINS***********************************
//GET - returns all Villains from the database (Crud)
app.get('/api/villains', function(req, res){
  Villain.find(function(err, data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

//GET - mongoose returns specific villain from the database (cRud)
app.get('/api/villains/:villain_id', function(req, res){
  Villain.findById(req.params.villain_id, function(err, fwieut){
    if(err){
      console.log(err)
    }else {
      res.json(fwieut)
    }
  });
});

//POST - creates and saves a new villain entered into Postman (cRud)
app.post('/api/villains', function(req, res){
  var newVill = new Villain({
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

//PUT - makes updates to existing data in the database
//NEED TO ADD PUT HERE!!

//DELETE - allows you to delete an entry from the database (cruD)
app.delete('/api/villains/:villain_id', function(req, res){

  Villain.remove({_id: req.params.villain_id}, function(err){ // we're not expecting data back, so we don't need res
    if(err){
      console.log(err);
    }else {
      res.send("Bad guy deleted!")
    }
  });
});

//********************SUPERHEROES***********************************
// returns all Superheroes from the database
app.get('/api/superheroes', function(req, res){
   Superhero.find(function(err, data){
     if(err){
       console.log(err);
     } else {
       res.json(data);
     }
   });
});

//PUT - makes updates to existing data in the database
app.put('/api/superheroes/:superhero_id', function(req,res){
  Superhero.findById(req.params.superhero_id, function(err, hero){
//     if(!hero) return res.status(404).send(err, "Can't find superhero!"); //one-line handler - most developers only use in node
    hero.name = req.body.name ? req.body.name : hero.name //(single object in the database, if name is blank, put in a name)
    hero.superPower = req.body.superPower ? req.body.superPower : hero.superPower;
    hero.universe = req.body.universe ? req.body.universe : hero.universe;
    hero.rank = req.body.rank ? req.body.rank : hero.rank;
    hero.alterEgo = req.body.alterEgo ? req.body.alterEgo : hero.alterEgo;
    hero.img = req.body.img ? req.body.img : hero.img;
    hero.save(function(e){
      if(e){
        res.status(500).send(e) //handling errors properly
      }else{
        res.json(hero);
      }
    })
  })
});

//get and post methods are creating an api for us so that we can interact with the database
app.post('/api/superheroes', function(req, res){
  //json is a backend server route (ALL json data points should be /api)
  var newSuper = new Superhero({
    name:       req.body.name,
    superPower: req.body.superPower,
    universe:   req.body.universe,
    evil:       req.body.evil,
    rank:       req.body.rank,
    alterEgo:      req.body.alterEgo,
    img:        req.body.img
  });
  newSuper.save(function(err, sh){
    if(err){
      console.log(err)
    } else {
      res.json(sh)
    }
  });
});

app.get('/api/superheroes/:superhero_id', function(req, res){
  Superhero.findById(req.params.superhero_id, function(err, gftq){
    if(err){
      console.log(err)
    }else {
      res.json(gftq)
    }
  });
});

//app.delete - we can use the same URL because we're using a different method (query for an id)
app.delete('/api/superheroes/:superhero_id', function(req, res){

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
