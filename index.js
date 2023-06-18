const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const userRoutes = require('./api/Users');
const thoughtRoutes = require('./api/thoughts');
const reactionRoutes = require('./api/reactions');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
// app.use('/api/reactions', reactionRoutes);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});