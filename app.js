// aap.js est notre coquille

const express = require('express');// framework 
const bodyParser = require('body-parser');//pour parser en json
const helmet = require('helmet'); // pour sécuriser l'application express
const mongoose = require('mongoose'); // pour gérer la base de données

const path = require('path'); // pour accéder au path de notre serveur

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/User');

const app = express();
require('dotenv').config()

// connexion de notre API à notre cluster MongoDB
mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS obligatoire car front et back ont deux URL distincts
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(helmet());
app.use(bodyParser.json()); 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
