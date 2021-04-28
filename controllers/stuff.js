const Sauces = require('../models/Sauces');
const fs = require('fs');

// création d'une sauce
exports.createSauces = (req, res, next) =>{
    const saucesObject = JSON.parse(req.body.sauce); // parse en json le corps de la requête
    delete saucesObject._id; // MongoDB génère lui-même un id
    const sauces = new Sauces ({ 
        ...saucesObject, // fait une copie de tous les éléments de saucesObject puis on ajoute les éléments ci-dessous
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // résoud l'URL complète de notre image
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    sauces.save() //sauvegarde la sauce créée
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
    const saucesObject = req.file ? // vérifie si req.file existe, 
    {
      ...JSON.parse(req.body.sauce), // alors on récupère le corps (req.body.sauce)
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on modifie notre image
    } : { ...req.body }; // si req.file n'existe pas, alors on copie req.body
    Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id }) // on modifie l'id pour correspondre aux paramètres de la requête
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
    .then(sauces => {
      const filename = sauces.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauces.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};

exports.likeSauces = (req, res, next) =>{
  switch(req.body.like){
    case 0 : Sauces.findOne({ _id: req.params.id })
      .then(sauces => 
        {
          if(sauces.usersLiked.find(user => user === req.body.userId)) {
            Sauces.updateOne({
              _id: req.params.id 
            },{
              $inc:{
                likes: -1
              },
              $pull:{
                usersLiked: req.body.userId
              },
              _id: req.params.id 
            })
            .then(() => res.status(200).json({ message: 'Like supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          }
          if(sauces.usersDisliked.find(user => user === req.body.userId)) {
            Sauces.updateOne({
              _id: req.params.id 
            },{
              $inc:{
                dislikes: -1
              },
              $pull:{
                usersDisliked: req.body.userId
              },
              _id: req.params.id 
            })
            .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          }

        })
      .catch(error => res.status(404).json({ error: error }));
      break;
    case 1 : Sauces.updateOne({
      _id: req.params.id 
    },{
      $inc:{
        likes: 1
      },
      $push:{
        usersLiked: req.body.userId
      },
      _id: req.params.id 
    })
    .then(() => res.status(200).json({ message: 'Like ajouté !'}))
    .catch(error => res.status(400).json({ error }));
    break;
    case -1 : Sauces.updateOne({
      _id: req.params.id 
    },{
      $inc:{
        dislikes: 1
      },
      $push:{
        usersDisliked: req.body.userId
      },
      _id: req.params.id 
    })
    .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
    .catch(error => res.status(400).json({ error }));
    break;
    }
  
};
