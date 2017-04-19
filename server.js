var express    = require('express'); //making our application use this
var path       = require('path');
var Superhero  = require('./models/superhero');
var Villain    = require('./models/villain');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var heroRoutes = require('./routes/superheroes');
var villRoutes = require('./routes/villains');


//app.METHOD('URL LOCATION', fucntion(req, res){})
mongoose.connect("mongodb://127.0.0.1:27017/superheroes");//connects to our local database

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));//tells express that all files inside the public folder are client-side "static code"

app.set('view engine', 'ejs'); //telling node to use ejs "ejs middleware"
app.set('views', path.join(__dirname, 'views'));//now telling node where the ejs is - and use this directory

app.get('/', function(req, res){ //this forces localhost:3000 to print index.ejs (my homepage)
  res.render('index')
});

app.get('/heroes', function(req, res){ //when the browser gets 3000/heroes... is pulls the goodGuys.ejs
  res.render('goodGuys');
});

app.get('/villains', function(req, res){ //when the browser gets 3000/bad... is pulls the badGuys.ejs
  res.render('badGuys');
});








//************BACK CODE TO KEEP AT THE END***********************************

//use all of the stuff we exported to heroRoutes (preference everything you access with "/api/superheroes")
app.use('/api/superheroes', heroRoutes);//mount the endpoint
app.use('/api/villains', villRoutes);//mount the endpoint

//Now we're building a little server
var server = app.listen(3000, function(){// takes a port and a "function" to run
  console.log('Server running HURRAY! on PORT 3000');
});
