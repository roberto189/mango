const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

const thoughts = [
    { username: 'User1', thoughtText: 'Respect my authority!', userId: 1 },
    { username: 'User2', thoughtText: 'Oh my God, they killed Kenny!', userId: 2 },
    { username: 'User3', thoughtText: 'You b@stards!', userId: 3 },
    { username: 'User4', thoughtText: 'Mmmph mmph mmmph!', userId: 4 }
  ];
  Thought.insertMany(thoughts)
  .then(() => console.log('Initial thoughts seeded successfully'))
  .catch((err) => console.error('Failed to seed initial thoughts:', err));

// get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server Error'});
  }
});

// Get a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

  
// create a new thought
router.post('/', async (req, res) => {
  try {
    const { username, thoughtText } = req.body;
    const thought = await Thought.create({
      username,
      thoughtText
    });
    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// update a thought
router.put('/:id', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// delete a thought
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
        return res.status(404).json({message: 'Thought not found'});
    }
    res.json({message: 'Thought deleted'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server Error'});
  }
});

module.exports = router;