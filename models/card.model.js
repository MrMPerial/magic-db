// Required Libraries
const mongoose = require('mongoose');
const mtg = require('mtgsdk');

// Card Schema
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
  imageUrl: String,
  price: Number
});

// DB module to export
let Card = module.exports = mongoose.model('Card', CardSchema);

// Add the card found to the DB
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
    imageUrl: package.imageUrl,
    price: package.price
  });
  return newCard.save();
}

// Find all cards in the DB
module.exports.getAllCards = () => {
  let allCards = [];
  Card.find({}, function (error, documents) {
    for ( let i = 0; i < documents.length; i++ ) {
      allCards.push(documents[i].imageUrl);
    }
  });
  return allCards;
}

// Count the total amount of cards saved in the DB
module.exports.cardCount = () => {
  let count;
  Card.find({}, function (error, documents) {
    count = documents.length;
  });
  return count;
}

// View the selected card
module.exports.viewCard = (card) => {
  let id = card;
  Card.findById(id, (error, card) => {
    console.log(card);
  });
}

// Delete the selected card from the DB
module.exports.removeCard = (card) => {
  Card.findById({ _id: card }).deleteOne().exec();
}
