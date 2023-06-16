const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRoutes = require('./api/Users');
const thoughtRoutes = require('./api/thoughts');
const reactionRoutes = require('./api/reactions');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});