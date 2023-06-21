const express = require('express');
const router = express.Router();

// const { authJwt, objectId } = require('../middleware');
const { getAllTerms, getTermById, createTerm, updateTerm, deleteTerm } = require('../Controller/term&conditionCtrl');
const verifyToken = require('../Middleware/verifyToken');



// GET all terms and conditions
router.get('/admin/terms', getAllTerms);

// GET a single term and condition by ID
router.get('/admin/terms/:id', /*[objectId.validId]*/ verifyToken, getTermById);

// CREATE a new term and condition
router.post('/admin/terms', createTerm);

// UPDATE a term and condition by ID
router.put('/admin/terms/:id', [/* authJwt.isAdmin, */ /*[objectId.validId]*/],verifyToken, updateTerm);

// DELETE a term and condition by ID
router.delete('/admin/terms/:id', [/* authJwt.isAdmin, */ /*[objectId.validId]*/], verifyToken, deleteTerm);

// users
router.get('/terms', getAllTerms);

// GET a single term and condition by ID
router.get('/terms/:id', getTermById);

module.exports = router;