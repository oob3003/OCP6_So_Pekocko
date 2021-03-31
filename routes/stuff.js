const express = require ('express');
const router = express.Router();

const stuffCtrl = require ('../controllers/stuff');

// enregistrer une nouvelle sauce
router.post('/', stuffCtrl.createSauces); 
    
// modifier une sauce
router.put('/:id', stuffCtrl.modifySauces); 

// supprimer une sauce
router.delete('/:id', stuffCtrl.deleteSauces);

// récupérer toutes les sauces
router.get('/', stuffCtrl.getAllSauces);

// récupérer une sauce en particulier
router.get('/:id', stuffCtrl.getOneSauces);

module.exports = router;