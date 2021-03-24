const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Sauces = require('./models/Sauces');

const app = express();

mongoose.connect('mongodb+srv://Bruno:4UMa6zhZ3DthAuQ@cluster1.lmrur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json()); 

app.post('/api/sauces', (req, res, next) =>{
    delete req.body._id;
    const sauces = new Sauces ({
        ...req.body
    });
    sauces.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
});

// récupérer toutes les sauces
app.get('/api/sauces', (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  });

// récupérer une sauce en particulier
  app.get('/api/sauces/:id', (req, res, next) => {
      Sauces.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
  })

module.exports = app;
