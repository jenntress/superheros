//************VILLAINS***********************************
//This file is used for refactoring.
var express = require('express');
var Router  = express.Router();
var Villain = require('../models/villain');


//GET - returns all Villains from the database (cRud)
Router.route('/')
 .get(function(req, res){
   Villain.find(function(err, data){
     if(err){
       console.log(err);
     } else {
       res.json(data);
     }
   });
 });
//GET by ID - mongoose returns specific villain from the database (cRud)
Router.route('/:villain_id')
 .get(function(req, res){
   Villain.findById(req.params.villain_id, function(err, fwieut){
     if(err){
       console.log(err)
     }else {
       res.json(fwieut)
     }
 });
});
//POST - creates and saves a new villain entered into Postman (Crud)
Router.route('/')
 .post(function(req,res){
   var newVillain = new Villain();
   newVillain.loadPower(req.body.evilPower);
   newVillain.loadData(req.body);
   newVillain.save(function(err, vill){
     if(err){
       console.log(err)
     } else {
       res.json(vill)
     }
   });
 });
//PUT - makes updates to existing data in the database (crUd)
Router.route('/:villain_id')
 .put(function(req, res){
   Villain.findById(req.params.villain_id, function(err, villy){
     villy.loadPower(req.body.evilPower);//mongoose methods
     villy.loadData(req.body);
     villy.save(function(err){
      if(err){
        res.status(500).send(err) //handling errors properly
      }else{
        res.json(villy);
      }
    });
  });
});

//DELETE - allows you to delete an entry from the database (cruD)
Router.route('/:villain_id')
 .delete(function(req,res){
  Villain.remove({_id: req.params.villain_id}, function(err){ // we're not expecting data back, so we don't need res
    if(err){
      console.log(err);
    }else {
      res.send("Bad guy deleted!")
    }
  });
});

 module.exports = Router;
