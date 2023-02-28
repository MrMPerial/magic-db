// Required Libraries
const router = require('express').Router();
const mtg = require('mtgsdk');
const request = require('request');

// Module
const Card = require('../../models/card.model');

//////////////////
// GET REQUESTS //
//////////////////

// Search MTG Database
router.get('/findCard', (req, res) => {
  let title = req.query.title;
  let result = [];
  mtg.card.where({
      name: title
    })
    .then(results => {
      result.push(results[0]);
      res.status(200).render('main', {
        card: result
      });
    })
});

// Show all of the Saved Cards in the DB
router.get('/allCards', (req, res) => {
  Card.find({}, function (error, documents) {
    if (error) {
      console.log(error);
    }
    let allCards = [];
    for ( let i = 0; i < documents.length; i++ ) {
      allCards.push(documents[i]);
    }
    res.render('allCards', { allCards: allCards, count: documents.length });
  });

  // update();
});

// async function update() {
//   await Card.updateMany({}, { $set: { price: "" } });
// }

// View the details of the selected card
router.get('/viewCard', (req, res) => {
  let card = {};
  Card.findById(req.query.viewCard, (error, single) => {
    card = {
      id: single._id,
      imageUrl: single.imageUrl,
      cardName: single.cardName,
      manaCost: single.manaCost,
      colorIdentity: single.colorIdentity,
      type: single.type,
      rarity: single.rarity,
      setName: single.setName,
      artist: single.artist,
      number: single.number,
      power: single.power,
      toughness: single.toughness,
      multiverseid: single.multiverseid,
      price: single.price,
      qty: single.qty
    }
    res.render('viewSingle', { card: card });
  });
});

router.get('/getValue', (req, res) => {
  let card = req.query.updateCard;
  let cardName = req.query.getValueCardName.replace(/\s/g, '%20');
  let setName = req.query.getValueSetName.replace(/\s/g, '%20');
  let api = `http://magictcgprices.appspot.com/api/cfb/price.json?cardname=${cardName}&setname=${setName}`;
  let newPrice = "";
  request(api, (error, res, body) => {
    if ( body == '[""]' ) {
      newPrice = 0;
    } else {
      newPrice = body;
    }
  });
  // Save to DB...
});

///////////////////
// POST REQUESTS //
///////////////////

// Add a New Card to the DB
router.post('/addNewCard', (req, res) => {
  let package = {
    cardName: req.body.cardName,
    manaCost: req.body.manaCost,
    colorIdentity: req.body.colorIdentity,
    type: req.body.type,
    rarity: req.body.rarity,
    setName: req.body.setName,
    artist: req.body.artist,
    number: req.body.number,
    power: req.body.power,
    toughness: req.body.toughness,
    multiverseid: req.body.multiverseid,
    imageUrl: req.body.imageUrl,
    price: "",
    qty: req.body.qty
  };
  Card.addToDB(package);
  res.render('main', { card: null });
});

// Delete the selected card
router.post('/removeCard', (req, res) => {
  // alert('Are you sure you want to remove this card?');
  Card.removeCard(req.body.removeCard);
  Card.find({}, function (error, documents) {
    if (error) {
      console.log(error);
    }
    let allCards = [];
    for ( let i = 0; i < documents.length; i++ ) {
      allCards.push(documents[i]);
    }
    res.render('allCards', { allCards: allCards, count: documents.length });
  });
});

module.exports = router;
