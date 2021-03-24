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
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});

app.use('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'stringId',
        name: 'stringName',
        manufacturer: 'stringManufacturer',
        description: 'stringDescription',
        heat: 'numberHeat',
        likes: 'numberLike',
        dislikes: 'numberDislike',
        imageUrl: 'stringImageUrl',
        mainPepper: 'stringMainPepper',
        usersLiked: 'stringLiked[]',
        usersDisliked: 'stringDisliked[]',
        userId: 'stringUserId',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(sauces);
  });

module.exports = app;
