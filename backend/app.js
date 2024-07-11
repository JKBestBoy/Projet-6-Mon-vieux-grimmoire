const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données MongoDB avec gestion des succès et des erreurs.
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => {
    console.error('Connexion à MongoDB échouée !', err);
  });

// Initialisation de l'application Express
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;