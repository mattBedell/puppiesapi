const express = require('express');
const router = express.Router();
const { getAllPuppies, adoptPuppy, abandonPuppy, likePuppy } = require('../../models/puppy');

// handle all the routes

// get all puppies
router.get('/', getAllPuppies, (req, res) => {
  res.json(res.puppies || []);
});

// Implement POST to adopt a puppy
router.post('/', adoptPuppy, (req, res) => {
  res.json(res.puppies || []);
})

router.put('/', likePuppy, (req, res) => {
  res.status(204).end();
})
router.delete('/', abandonPuppy, (req, res) => {
  res.status(204).end();
})

// Implement DELETE to abandon a puppy :(

module.exports = router;
