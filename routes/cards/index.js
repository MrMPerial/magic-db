const router = require('express').Router();
const mtg = require('mtgsdk');

const Card = require('../../models/card.model');

// GET REQUESTS
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

// POST REQUESTS
router.post('/addNewCard', (req, res) => {

  let package = {
    cardName: req.body.cardName,
    image: req.body.imageUrl,
    manaCost: req.body.manaCost,
    colorIdentity: req.body.colorIdentity,
    type: req.body.type,
    rarity: req.body.rarity,
    setName: req.body.setName,
    artist: req.body.artist,
    number: req.body.number,
    power: req.body.power,
    toughness: req.body.toughness,
    multiverseid: req.body.multiverseid
  };

  Card.addToDB(package);

  res.status(200).end('Your card has been added to the system.');
});

module.exports = router;
