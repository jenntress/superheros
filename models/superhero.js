var mongoose = require('mongoose');

var SuperheroSchema = new mongoose.Schema({
    name: String,
    superPower: String,
    universe: String,
    evil: {default: false, type: Boolean},
    rank: Number,
    alterEgo: String,
    img: String
});

module.exports = mongoose.model('Superhero', SuperheroSchema);
