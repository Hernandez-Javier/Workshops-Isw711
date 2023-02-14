const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const team = require("./team"); 

const player = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  age: { type: String },
  team: team.schema
});

module.exports = mongoose.model('players', player);