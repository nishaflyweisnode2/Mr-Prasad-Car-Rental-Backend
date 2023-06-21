const Car = require("../Model/carModel");
const Review = require("../Model/reviewModel");

const createReview = async (req, res) => {
  try {
    const { carId } = req.params;
    const { rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ message: 'Both rating and message are required' });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const review = await Review.create({
      user: req.user.id,
      carId,
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

module.exports = createReview;