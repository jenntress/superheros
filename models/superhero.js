var mongoose = require('mongoose');

var SuperheroSchema = new mongoose.Schema({
    name: String,
    superPower: String,
    universe: String,
    evil: Boolean,
    rank: Number,
    alias: String,
    img: String
});

module.exports = mongoose.model('Superhero', SuperheroSchema);
