const Car = require("../Model/carModel");
const Brand = require("../Model/brandModel");
const UserDb = require("../Model/authModel");
const Booking = require("../Model/bookingModel");
const Location = require("../Model/locationModel");
const User = require("../Model/authModel");
const moment = require('moment')



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
    const { owner, brand, carLocation, ...carData } = req.body;

    const userExists = await UserDb.exists({ _id: owner });
    if (!userExists) {
      return res.status(404).json({ error: "User ID does not exist" });
    }

    const brandExists = await Brand.exists({ _id: brand });
    if (!brandExists) {
      return res.status(400).json({ error: 'Brand ID does not exist' });
    }

    const locationExists = await Location.exists({ _id: carLocation.geolocation });
    if (!locationExists) {
      return res.status(400).json({ error: 'Location ID does not exist' });
    }

    const populatedUser = await UserDb.findById(owner).select('name');
    const populatedBrand = await Brand.findById(brand).select('-__v');
    const populatedLocation = await Location.findById(carLocation.geolocation).select('-__v');

    const newCar = new Car({
      ...carData,
      brand: populatedBrand,
      owner: populatedUser,
      carLocation: {
        address: carLocation.address,
        geolocation: populatedLocation
      }
    });

    const savedCar = await newCar.save();

    return res.status(201).json({ status: 201, data: savedCar });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const uploadCarImageVideo1 = async (req, res) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    if (req.files.images) {
      car.images = req.files.images.map((image) => image.path);
    }

    if (req.files.videos) {
      car.videos = req.files.videos.map((video) => video.path);
    }

    await car.save();

    return res.status(200).json({ message: 'Car media updated successfully', data: car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const uploadCarImage = async (req, res) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    let images = [];
    if (req.files) {
      for (let j = 0; j < req.files.length; j++) {
        let obj = {
          img: req.files[j].path,
        };
        images.push(obj);
      }
    }

    car.images = images;


    await car.save();

    return res.status(200).json({ message: 'Car media updated successfully', data: car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadCarVideo1 = async (req, res) => {
  try {
    const carId = req.params.carId;
    console.log('carId:', carId);
    console.log(' req.files:', req.files);

    const car = await Car.findById(carId);
    console.log('car:', car);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    console.log('Uploaded Video Files:', req.files);

    let videos = [];
    if (req.files && req.files.length > 0) {
      for (let j = 0; j < req.files.length; j++) {
        let obj = {
          vid: req.files[j].path,
        };
        videos.push(obj);
      }
    } else {
      return res.status(400).json({ error: 'No videos uploaded' });
    }

    car.videos = videos;

    await car.save();

    return res.status(200).json({ message: 'Car media updated successfully', data: car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadCarVideo = async (req, res) => {
  try {
    console.log('Request Object:', req);
    const carId = req.params.carId;
    console.log('carId:', carId);

    const car = await Car.findById(carId);
    console.log('car:', car);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    console.log('Uploaded Video Files:');
    for (let j = 0; j < req.files.length; j++) {
      console.log(`File ${j + 1}:`);
      console.log('Field name:', req.files[j].fieldname);
      console.log('Original name:', req.files[j].originalname);
      console.log('Path:', req.files[j].path);
      console.log('Size:', req.files[j].size);
    }

    let videos = [];
    if (req.files && req.files.length > 0) {
      for (let j = 0; j < req.files.length; j++) {
        let obj = {
          vid: req.files[j].path,
        };
        videos.push(obj);
      }
    } else {
      return res.status(400).json({ error: 'No videos uploaded' });
    }

    car.videos = videos;

    await car.save();

    return res.status(200).json({ message: 'Car media updated successfully', data: car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




///////////////////////////////////////////// GET ALL CARS //////////////////////////////////

const getCarList1 = async (req, res) => {
  try {
    const carList = await Car.find()
      .populate('owner', 'name')
      .populate('brand', '-__v');
    if (!carList) {
      return res.status(404).json({ error: 'Car not found' });
    }
    return res.status(200).json({ status: 200, data: carList });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCarList = async (req, res) => {
  try {
    const { date, time, isBooked } = req.query;

    const filter = {};

    if (date && time) {
      filter['availability.date'] = date;
      filter['availability.time'] = time;
      filter['availability.isBooked'] = isBooked === 'true';
    } else if (isBooked) {
      filter['availability.isBooked'] = isBooked === 'true';
    }

    const carList = await Car.find(filter)
      .populate('owner', 'name')
      .populate('brand', '-__v');

    if (!carList) {
      return res.status(404).json({ error: 'Car not found' });
    }

    return res.status(200).json({ status: 200, data: carList });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


///////////////////////////////////////////// GET SINGLE CAR //////////////////////////////////

const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('owner', 'name')
      .populate('brand', '-__v');

    if (!car) {
      return res.status(404).json({ status: 404, error: 'Car not found' });
    }

    return res.status(200).json({ status: 200, data: car });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
    return res.status(200).json({ status: 200, data: car });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////// DELETE CAR ////////////////////////////////////

const deleteCar = async (req, res) => {
  try {
    const carList = await Car.findByIdAndDelete(req.params.id).sort("name");
    return res.status(200).json({ status: 200, data: carList });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

///////////////////////////////////////////// NEAR BY CAR ////////////////////////////////////

const getNearbyCar = async (req, res) => {
  try {
    const { latitude, longitude /* radius */ } = req.query;
    console.log(latitude, longitude /* radius */);
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

    return res.status(200).json({ status: 200, data: nearbyCars });
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
    const trips = await Booking.find({ 'user': userId, 'status': 'PAID' }).populate('car');

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No paid trips found for the user' });
    }

    return res.status(200).json({ status: 200, data: trips });
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

    return res.status(200).json({ status: 200, message: 'Car added to favorites', data: user });
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
      return res.status(200).json({ status: 200, message: 'Favorite Car retrived sucessfull', data: user.favoriteCars });
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

    return res.status(200).json({ status: 200, message: "You are now a host", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const popularCars = async (req, res) => {
  try {
    const popularCars = await Car.find()
      .sort({ rentalCount: -1 })
      .limit(10);
    if (!popularCars || popularCars.length === 0) {
      return res.status(404).json({ error: "popular not found" });
    }
    return res.status(200).json({ status: 200, data: popularCars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




const getCarLocation = async (req, res) => {
  try {
    const carId = req.params.carId;
    const userId = req.params.userId;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    console.log("car ", car);


    const locationId = car.carLocation.geolocation;
    const locations = await Location.findById(locationId);
    if (!locations) {
      return res.status(400).json({ error: 'Location not found' });
    }
    console.log("location ", locations);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("user ", user);


    const distance = calculateHaversineDistance(
      car.location.coordinates[1], // Car's latitude
      // console.log("car.location.coordinates[1],", car.location.coordinates[1]),
      car.location.coordinates[0], // Car's longitude
      // console.log("car.location.coordinates[0],", car.location.coordinates[0]),

      user.location.coordinates[1], // User's latitude
      // console.log("user.location.coordinates[1],", user.location.coordinates[1]),

      user.location.coordinates[0], // User's longitude
      // console.log("user.location.coordinates[0],", user.location.coordinates[0]),

    );

    console.log("distance", distance);
    const carLocationData = {
      address: car.carLocation,
      geolocation: locations,
      distance: distance
    };

    return res.status(200).json({ status: 200, carLocation: carLocationData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateCarLockStatus = async (req, res) => {
  try {
    const carId = req.params.carId;
    const isCarLock = req.body.isCarLock;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    car.isCarLock = isCarLock;
    await car.save();

    return res.status(200).json({ message: 'Car lock status updated successfully', data: car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Function to calculate distance using Haversine formula
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in kilometers

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}


const addOrUpdateAvailability = async (req, res) => {
  const { carId } = req.params;
  const { date, time, isBooked } = req.body;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const availabilitySlot = car.availability.find(slot => slot.date === date && slot.time === time);

    if (availabilitySlot) {
      availabilitySlot.isBooked = isBooked;
    } else {
      car.availability.push({ date, time, isBooked });
    }

    await car.save();
    return res.status(200).json({ message: 'Availability updated successfully', data: car.availability });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating availability' });
  }
};


const checkCarAvailability = async (req, res) => {
  const { date, time } = req.query;

  try {
    const availableCars = await Car.find({
      'availability.date': date,
      'availability.time': time,
      'availability.isBooked': false,
    });

    return res.status(200).json(availableCars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while checking car availability' });
  }
};


const startTrip = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status !== 'PAID') {
      return res.status(400).json({ error: 'Cannot start trip for unpaid booking' });
    }

    const car = await Car.findById(booking.car);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    if (car.isCarLock === true) {
      return res.status(400).json({ error: 'Cannot start trip for car lock first approved by admin ' });
    }

    car.isOnTrip = true;
    await car.save();

    booking.tripStartTime = new Date();
    await booking.save();

    return res.status(200).json({ status: 200, message: 'Trip started successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const endTrip = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.status !== 'PAID') {
      return res.status(400).json({ error: 'Cannot end trip for unpaid booking' });
    }

    const car = await Car.findById(booking.car);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    if (car.isCarLock === true) {
      return res.status(400).json({ error: 'Cannot end trip for car lock; first, unlock the car through admin approval' });
    }

    car.isOnTrip = false;
    await car.save();

    booking.tripEndTime = new Date();
    booking.isTripCompleted = true
    await booking.save();

    const countdownMilliseconds = car.unavailableInterval * 60 * 60 * 1000;
    setTimeout(async () => {
      car.nextAvailableDateTime = new Date();
      car.isCarLock = true;
      await car.save();
    }, countdownMilliseconds);

    car.isCarLock = true;
    await car.save();

    return res.status(200).json({ status: 200, message: 'Trip ended successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

















module.exports = {
  createCar,
  uploadCarImage,
  uploadCarVideo,
  getCarList,
  getCar,
  updateCar,
  deleteCar,
  getNearbyCar,
  getMyTrip,
  addToFavorites,
  getFavoriteCars,
  becomeHost,
  popularCars,
  getCarLocation,
  updateCarLockStatus,
  addOrUpdateAvailability,
  checkCarAvailability,
  startTrip,
  endTrip
};
