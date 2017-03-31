var mongoose = require('mongoose');

var VillianSchema = new mongoose.Schema({
    name: String,
    evilPower: String,
    evil: {default: true, type: Boolean},
    nemesis: String
});

module.exports = mongoose.model('Villian', VillianSchema);
