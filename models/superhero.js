//mongoose model
var mongoose = require('mongoose');

var SuperheroSchema = new mongoose.Schema({
    name: String,
    superPowers: { default: [], type: Array },
    universe: String,
    evil: {default: false, type: Boolean},
    rank: Number,
    alterEgo: String,
    img: String
});

//use this to update our superhero (if we don't want to update a particular field, it will default to what's already there.)
SuperheroSchema.methods.loadData = function(data){
  this.name     = data.name ? data.name : this.name;
  this.universe = data.universe ? data.universe : this.universe;
  this.rank     = data.rank ? data.rank : this.rank;
  this.evil     = data.evil ? data.evil : this.evil;
  this.alterEgo = data.alterEgo ? data.alterEgo : this.alterEgo;
  this.img      = data.img ? data.img : this.img;
}

SuperheroSchema.methods.loadPower = function(powerN){
  this.superPowers.push(powerN);
}
module.exports = mongoose.model('Superhero', SuperheroSchema);
