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
  let cardName = req.body.cardName;
  let image = req.body.imageUrl;
  let manaCost = req.body.manaCost;
  let colorIdentity = req.body.colorIdentity;
  let type = req.body.type;
  let rarity = req.body.rarity;
  let setName = req.body.setName;
  let artist = req.body.artist;
  let number = req.body.number;
  let power = req.body.power;
  let toughness = req.body.toughness;
  let multiverseid = req.body.multiverseid;
  

  console.log(cardName);
  console.log(image);
  console.log(manaCost);
  console.log(colorIdentity);
  console.log(type);
  console.log(rarity);
  console.log(setName);
  console.log(artist);
  console.log(number);
  console.log(power);
  console.log(toughness);
  console.log(multiverseid);

  // Card.addToDB(title);

  res.status(200).end('Your card has been added to the system.');
});

module.exports = router;
