const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user');

// Connect to database
mongoose.connect('mongodb+srv://OpenClassrooms:1234@cluster0.diiyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

// Set headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Defines the base of every routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/publications', publicationRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;