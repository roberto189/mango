const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const users = [
  { _id: '1', username: 'stanmarsh', email: 'stan.marsh@example.com' },
  { _id: '2', username: 'kylebroflovski', email: 'kyle.broflovski@example.com' },
  { _id: '3', username: 'ericcartman', email: 'eric.cartman@example.com' },
  { _id: '4', username: 'kennymccormick', email: 'kenny.mccormick@example.com' }
];

// Get all users
router.get('/', async (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = users.find(user => user._id === id);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(foundUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      user.name = name;
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user._id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      users.splice(userIndex, 1);
      res.json({ message: 'User deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = users.find((user) => user._id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friend = users.find((user) => user._id === friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends && user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    if (!user.friends) {
      user.friends = [];
    }

    user.friends.push(friendId);

    res.json({ message: 'Friend added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = users.find((user) => user._id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friends || !user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend not found in the user\'s friend list' });
    }

    const friendIndex = user.friends.findIndex((friend) => friend === friendId);
    if (friendIndex !== -1) {
      user.friends.splice(friendIndex, 1);
    }

    res.json({ message: 'Friend removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;