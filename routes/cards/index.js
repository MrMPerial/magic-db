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
  let title = req.body.title;
  let image = req.body.imageUrl;

  Card.addToDB(title);

  res.status(200).send('Your card has been added to the system.');
});

module.exports = router;
