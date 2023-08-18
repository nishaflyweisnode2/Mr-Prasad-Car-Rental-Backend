const Car = require("../Model/carModel");
const Brand = require("../Model/brandModel");
const UserDb = require("../Model/authModel");
const Booking = require("../Model/bookingModel");


///////////////////////////////////////////// CREATE CAR //////////////////////////////////

// const createCar = async (req, res) => {
//   try {
//     // const existcar = await Car.findById(req.body.id);

//     // if (existcar) {
//     //   res.status(400).json({ error: 'Car already exists' });
//     //   return;
//     // }

//     const newCar = new Car(req.body);
//     const savedCar = await newCar.save();
//     res.json(savedCar);
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => err.message);
//       res.status(400).json({ error: errors });
//     } else {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// };


const createCar = async (req, res) => {
  try {
    const user = await UserDb.exists({ _id: req.body.owner });

    if (!user) {
      return res.status(404).json({ error: "User ID does not exist" });
    }

    const populateduser = await UserDb.findById(req.body.owner).select('name');

    const brandExists = await Brand.exists({ _id: req.body.brand });

    if (!brandExists) {
      return res.status(400).json({ error: 'Brand ID does not exist' });
    }
    const populatedBrand = await Brand.findById(req.body.brand).select('-__v');

    const newCar = new Car({
      ...req.body,
      brand: populatedBrand,
      owner: populateduser
    });
    const savedCar = await newCar.save();
    res.json(savedCar);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

///////////////////////////////////////////// GET ALL CARS //////////////////////////////////

const getCarList = async (req, res) => {
  try {
    const carList = await Car.find().sort("name");
    res.json(carList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////// GET SINGLE CAR //////////////////////////////////

const getCar = async (req, res) => {
  try {
    const carList = await Car.findById(req.params.id).sort("name");
    res.json(carList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////// UPDATE CAR ////////////////////////////////////

const updateCar = async (req, res) => {
  try {

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!car) {
      res.status(404).json({ error: "Car not found" });
      return;
    }

    await car.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////// DELETE CAR ////////////////////////////////////

const deleteCar = async (req, res) => {
  try {
    const carList = await Car.findByIdAndDelete(req.params.id).sort("name");
    res.json(carList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////// NEAR BY CAR ////////////////////////////////////

const getNearbyCar = async (req, res) => {
  try {
    const { latitude, longitude /* radius */ } = req.query;
    console.log(latitude, longitude /* radius */);
    // Ensure latitude and longitude are provided
    if (!latitude || !longitude  /* ||!radius */) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    // const userCoordinates = [parseFloat(longitude), parseFloat(latitude)];

    const nearbyCars = await Car.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
          $maxDistance: 500,
        },
      },
    });

    res.status(200).json(nearbyCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

///////////////////////////////////////////// GET MY TRIP////////////////////////////////////

// const getMyTrip = async (req, res) => {
//   const carId = req.params.id;
//   try {
//     const car = await Car.findById(carId)
//       .select('name location pickup Drop Date owner year')
//       .populate('owner', 'name')
//       .exec();

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found' });
//     }
//     // const paymentMode = "Credit Card";

//     res.json({
//       carName: car.name,
//       year: car.year,
//       location: car.location,
//       pickup: car.pickup,
//       drop: car.Drop,
//       date: car.Date,
//       ownerName: car.owner.name,
//       // paymentMode: paymentMode,

//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


const getMyTrip = async (req, res) => {
  const userId = req.params.userId;
  try {
    const trips = await Booking.find({ 'user': userId, 'status': 'paid' }).populate('car');

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No paid trips found for the user' });
    }

    res.json({ trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


/////////////////////////////////////////////// ADD TO MY FAVORITE CAR////////////////////////////////////

const addToFavorites = async (req, res) => {
  try {
    const carId = req.body.carId;
    const userId = req.params.userId;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    const user = await UserDb.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.favoriteCars.includes(carId)) {
      user.favoriteCars.push(carId);
      await user.save();
    }

    res.json({ message: 'Car added to favorites', data: user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


///////////////////////////////////////////// GET FAVORITE CAR////////////////////////////////////

const getFavoriteCars = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);

    const user = await UserDb.findById(userId).populate('favoriteCars').exec();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.favoriteCars) {
      res.json({ message: 'Favorite Car retrived sucessfull', data: user.favoriteCars });
    } else {
      console.error('No favoriteCars found for user:', userId);
      res.status(500).json({ error: 'Internal server error1' });
    }
  } catch (error) {
    console.error('Error retrieving favoriteCars:', error);
    res.status(500).json({ error: 'Internal server error2' });
  }
};



const becomeHost = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserDb.findByIdAndUpdate(userId, { isHost: true }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "You are now a host" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};








module.exports = {
  createCar,
  getCarList,
  getCar,
  updateCar,
  deleteCar,
  getNearbyCar,
  getMyTrip,
  addToFavorites,
  getFavoriteCars,
  becomeHost,
};
