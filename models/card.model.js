const mongoose = require('mongoose');
const mtg = require('mtgsdk');

const CardSchema = mongoose.Schema({
  title: String
});

let Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.addToDB = (title) => {
  let newCard = new Card({
    title: title,
    manaCost: manaCost,
    colorIdentity: colorIdentity,
    type: type,
    rarity: rarity,
    setName: setName,
    artist: artist,
    number: number,
    power: power,
    toughness: toughness,
    multiverseid: multiverseid,
    imageUrl: imageUrl
  });

  return newCard.save();
}
