// const express = require('express');
// const router = express.Router();
// const Thought = require('../models/Thought');

// // Create a reaction for a thought
// router.post('/:thoughtId/reactions', async (req, res) => {
//   try {
//     const { thoughtId } = req.params;
//     const { reactionBody, username } = req.body;
    
//     const thought = await Thought.findById(thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: 'Thought not found' });
//     }
    
//     thought.reactions.push({ reactionBody, username });
//     await thought.save();
    
//     res.json(thought);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Delete a reaction from a thought
// router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
//   try {
//     const { thoughtId, reactionId } = req.params;
    
//     const thought = await Thought.findById(thoughtId);
//     if (!thought) {
//       return res.status(404).json({ message: 'Thought not found' });
//     }
    
//     thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
//     await thought.save();
    
//     res.json({ message: 'Reaction removed' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;