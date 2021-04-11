const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// enregistrer une nouvelle sauce
router.post('/', auth, multer, stuffCtrl.createSauces); 
    
// modifier une sauce
router.put('/:id', auth, multer, stuffCtrl.modifySauces); 

// supprimer une sauce
router.delete('/:id', auth, stuffCtrl.deleteSauces);

// récupérer toutes les sauces
router.get('/', auth, stuffCtrl.getAllSauces);

// récupérer une sauce en particulier
router.get('/:id', auth, stuffCtrl.getOneSauces);

// traitement des likes
router.post('/:id/like', auth, stuffCtrl.likeSauces); 

module.exports = router;