const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/User');


router.get('/', (req, res) => {
  Thought.find()
   .then((thoughts) => {
       res.json(thoughts);
   })
   .catch((err) => {
       console.log(err);
       res.status(500).json({ msg: 'Error', err });
   });
});

router.get('/:id', (req, res) => {
  Thought.findById(req.params.id)
   .then((thought) => {
       res.json(thought);
   })
   .catch((err) => {
       console.log(err);
       res.status(500).json({ msg: 'Error', err });
   });
});

router.post('/', (req, res) => {
  Thought.create({
      thoughtText: req.body.text, 
      username: req.body.username
  })
      .then((newThought) => {
          User.findOneAndUpdate(
           { username: req.body.username },
           { $push: { thoughts: newThought._id}  }
          ).catch((err) => {
              console.log(err);
              res.status(500).json({ msg: 'Error', err });
          });
          res.json(newThought);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json({ msg: 'Error', err });
      });
});

router.put('/:id', (req, res) => {
  Thought.findByIdAndUpdate(req.params.id, {
      thoughtText: req.body.text
  })
   .then((updateThought) => {
       res.json(updateThought);
   })
   .catch((err) => {
       console.log(err);
       res.status(500).json({ msg: 'Error', err });
   });
});

router.delete('/:id', (req, res) => {
  Thought.findByIdAndDelete(req.params.id)
   .then((deleteThought) => {
       res.json(deleteThought);
   })
   .catch((err) => {
       console.log(err);
       res.status(500).json({ msg: 'Error', err });
   });
});

router.post('/:id/reactions', (req, res) => {
  Thought.findByIdAndUpdate (req.params.id, {
      $addToSet: {
        reactions: {
            reactionBody: req.body.reactionBody, 
            username: req.body.username
        }
      }
  })
   .then((reaction) => {
       res.json(reaction);
   })
   .catch((err) => {
       console.log(err);
       res.status(500).json({ msg: "Error", err });
   });
});

router.delete('/:id/reactions/:rId', (req, res) => {
  Thought.findByIdAndUpdate(req.params.id, {
      $pull: {
          reactions: { reactionId: req.params.rId }
      }
  })
   .then((deleteReaction) => {
       res.json(deleteReaction);
   })
   .catch((err) => {
       console.log(err);
       res.status(500).json({ msg:'Error', err });
   });
});

module.exports = router;