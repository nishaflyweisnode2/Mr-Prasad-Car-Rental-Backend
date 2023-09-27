const Car = require("../Model/carModel");
const Review = require("../Model/reviewModel");
const User = require("../Model/authModel");

const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId:", userId);
    const { carId } = req.params;
    const { rating, message } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    if (!rating || !message) {
      return res.status(400).json({ message: 'Both rating and message are required' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const review = await Review.create({
      user: userId,
      carId: carId,
      rating,
      message
    });

    car.averageRating = await Review.aggregate([
      { $match: { carId: car._id } },
      { $group: { _id: '$carId', averageRating: { $avg: '$rating' } } }
    ]);

    await car.save();

    res.status(201).json({ message: 'Review submitted', data: review });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const getReviewsForCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await Review.find({ carId });

    res.status(200).json({ status: 200, data: reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






module.exports = {
  createReview,
  getReviewsForCar,
};
