var express = require('express');
var router = express.Router();
var AnimalEvents = require('../models/animal');

/* GET home page. */
router.get('/getAnimal', async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  let animal = await AnimalEvents.find();
  res.send(animal);
});

router.post('/postAnimal', async (req, res) => {
  let animal = new AnimalEvents(req.body);
  await animal.save();
  console.log('checking');
  res.status(200).send('done');
});

module.exports = router;
