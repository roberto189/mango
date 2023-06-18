const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Get all users
router.get('/', (req, res) => {
  User.find().populate('thoughts')
      .then(users => {
          res.json(users);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ msg: 'Error', err });
      });
});
// GET a single user by its _id and populated thought and friend data
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
      .then(user => {
          res.json(user);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ msg: 'Error', err });
      });
});

// Create a new user
router.post('/', (req, res) => {
  User.create({
      username: req.body.username,
      email: req.body.email
  })
   .then(newUser => {
       res.json(newUser);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({ msg: 'Error', err });
   });
});

// Update a user
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email
  })
   .then(updatedUser => {
       res.json(updatedUser);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({ msg: 'Error', err });
   });
});

// Delete a user
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(deleteUser => {
        Thought.deleteMany({ username: deleteUser.username })
          .catch(err => {
              console.log(err);
              res.status(500).json({ msg: 'Error', err });
          });
        res.json({ msg: "Success" });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: 'Error', err });
    });
});

// Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $push: { friends: req.params.friendId }})
  .then(newFriend => {
    res.json(newFriend);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({ msg:'Error', err });
  });
});

// Delete a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId }})
     .then(deletedFriend => {
        res.json(deletedFriend);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({ msg: 'Error', err });
     });
});

module.exports = router;