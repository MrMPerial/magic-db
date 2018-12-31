const router = require('express').Router();

const Card = require('../../models/card.model');

router.post('/addNewCard', (req, res) => {
  let title = req.body.title;

  Card.addToDB(title);

  res.status(200).send('Your card has been added to the system.');
});

module.exports = router;
