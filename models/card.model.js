const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  title: String
});

let Card = module.exports = mongoose.model('Card', CardSchema);
