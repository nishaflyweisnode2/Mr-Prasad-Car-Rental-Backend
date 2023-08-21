const express = require('express');
const router = express.Router();
const { createOffer, getAllOffers, getOfferById } = require('../Controller/offerController');

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

router.post('/offers', Admin, createOffer);

router.get('/offers', getAllOffers);

router.get('/offers/:offerId', getOfferById);


module.exports = router;
