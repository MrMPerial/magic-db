const router = require('express').Router();
const mtg = require('mtgsdk');

const Card = require('../../models/card.model');

// GET REQUESTS //

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

// Show All of the Saved Cards in my Databse
router.get('/allCards', (req, res) => {

  Card.find({}, function (error, documents) {
    if (error) {
      console.log(error);
    }

    let allCards = [];

    for ( let i = 0; i < documents.length; i++ ) {
      allCards.push(documents[i]);
    }

    res.render('allCards', { allCards: allCards });
  });

});

// POST REQUESTS //

// Add a New Card to my Database
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
  };

  Card.addToDB(package);

  res.render('main', { card: null });
});

router.post('/removeCard', (req, res) => {

  Card.removeCard(req.body.cardId);

  Card.find({}, function (error, documents) {
    if (error) {
      console.log(error);
    }

    let allCards = [];

    for ( let i = 0; i < documents.length; i++ ) {
      allCards.push(documents[i]);
    }

    res.render('allCards', { allCards: allCards });
  });
});

module.exports = router;
