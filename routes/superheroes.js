//********************SUPERHEROES***********************************
//This file is used for refactoring.

var express = require('express');
var Router  = express.Router();
var Superhero = require('../models/superhero');


//******* GET ********
Router.route('/')
 .get(function(req,res){
   Superhero.find(function(err,data){
     if(err){
       console.log("you have an error!");
     }else {
       res.json(data);
     }
   });
 });

 //****** GET by ID *****
 Router.route('/superhero_id')
  .get(function(req, res){
    Superhero.findById(req.params.superhero_id, function(err, data){
      if(err){
        console.log(err);
      }else{
        res.json(data);
      }
    });
  });
//****** POST ********
Router.route('/') // Route chained to the GET route (chained together because they're both using the same URL)
 .post(function(req,res){
   var newSuperHero = new Superhero();
   newSuperHero.loadPower(req.body.superPower);
   newSuperHero.loadData(req.body);
   newSuperHero.save(function(err,sh){
     if(err){
        console.log(err)
     }else{
       res.json(sh)
     }
   });
 })
 //*******async********** "async.each" doing a bunch of things at once.. asynchronously (good for batching)
 //async for each thing in this array of data, for each item in the array the function will execute.
 //must tell async when to quit - use "cb" - put it with whatever results I want once I've completed that action.
// in postman, http://localhost:3000/api/superheroes/multiple-superPowers
// go to POST, then Body, then "raw", then text dropdown to JSON, then type:
//    {"data":[{ "name": "superman"},{ "name": "uberman" },{ "name": "loserman" }]}
  .post(function(req,res){
      var newHeroes = [];
      console.log(req.body.data, "REQUEST BODY DATA");
      async.each(req.body.data, function(hero, cb) {
        var newHero = new Superhero();
          newHero.loadPower(hero.superPower);
          newHero.loadData(hero);
          newHero.save()
          .then(function(hero){
            console.log(hero, 'EACH HERO SUCCESS');
            newHeroes.push(hero);
            cb(); //do not pass a parameter into the first cb
          }, function(err){
            if(err) cb(err);
          });
      },function(err) {
          if(err) throw err;
          res.json(newHeroes);
        });
    });

//****** PUT *******
Router.route('/:superhero_id')
 .put(function(req, res){
   Superhero.findById(req.params.superhero_id, function(err, hero){
     if(!hero) return res.status(404).send(err, "Can't find superhero");
     hero.loadPower(req.body.superPower);
     hero.loadData(req.body);
     hero.save(function(e){
       if(e){
         res.status(500).send(e);
       }else{
         res.json(hero);
       }
     });
   });
 });
//***** DELETE ********
Router.route('/:superhero_id')
 .delete(function(req, res){
   Superhero.remove({_id: req.params.superhero_id}, function (err){
     if(err){
       console.log(err)
     }else{
       res.send("Super hero successfully removed!")
     }
   });
 });

 module.exports = Router;
