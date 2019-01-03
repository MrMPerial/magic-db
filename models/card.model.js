const mongoose = require('mongoose');
const mtg = require('mtgsdk');

const CardSchema = mongoose.Schema({
  cardName: String,
  manaCost: String,
  colorIdentity: Array,
  type: String,
  rarity: String,
  setName: String,
  artist: String,
  number: String,
  power: String,
  toughness: String,
  multiverseid: Number,
  imageUrl: String
});

let Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.addToDB = (package) => {

  let newCard = new Card({
    cardName: package.cardName,
    manaCost: package.manaCost,
    colorIdentity: package.colorIdentity,
    type: package.type,
    rarity: package.rarity,
    setName: package.setName,
    artist: package.artist,
    number: package.number,
    power: package.power,
    toughness: package.toughness,
    multiverseid: package.multiverseid,
    imageUrl: package.imageUrl
  });

  return newCard.save();
}
