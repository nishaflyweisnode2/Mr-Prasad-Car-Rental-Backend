const Offer = require('../Model/offerModel');
const Car = require("../Model/carModel");



// const createOffer = async (req, res) => {
//     try {
//         const { car, offerCode, discountPercentage, startDate, endDate } = req.body;

//         const checkCar = await Car.findById({ _id: car })
//         if (!checkCar) {
//             return res.status(404).json({ error: "Car not found" });
//         }
//         const existingOffer = await Offer.findOne({ offerCode });
//         if (existingOffer) {
//             return res.status(400).json({ error: 'Offer with the same code already exists' });
//         }
//         const newOffer = new Offer({
//             car,
//             offerCode,
//             discountPercentage,
//             startDate,
//             endDate,
//         });

//         const savedOffer = await newOffer.save();
//         res.status(201).json(savedOffer);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };



const createOffer = async (req, res) => {
    try {
      const { car, offerCode, discountPercentage, startDate, endDate } = req.body;
  
      if (car) {
        const checkCar = await Car.findById({ _id: car });
        if (!checkCar) {
          return res.status(404).json({ error: 'Car not found' });
        }
      }
  
      const existingOffer = await Offer.findOne({ offerCode });
      if (existingOffer) {
        return res.status(400).json({ error: 'Offer with the same code already exists' });
      }
  
      const newOffer = new Offer({
        car,
        offerCode,
        discountPercentage,
        startDate,
        endDate,
      });
  
      const savedOffer = await newOffer.save();
      res.status(201).json(savedOffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  

const getAllOffers = async (req, res) => {
    try {
      const offers = await Offer.find();
      res.json(offers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


  const getOfferById = async (req, res) => {
    const offerId = req.params.offerId;
  
    try {
      const offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ error: 'Offer not found' });
      }
      res.json(offer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


  module.exports = {
    createOffer,
    getAllOffers,
    getOfferById,
  };
  
  
