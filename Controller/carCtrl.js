const Car = require("../Model/carModel");

///////////////////////////////////////////// CREATE CAR //////////////////////////////////

const createCar = async (req, res) => {
  try {
    // const existcar = await Car.findById(req.body.id);

    // if (existcar) {
    //   res.status(400).json({ error: 'Car already exists' });
    //   return;
    // }

    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.json(savedCar);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
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
    const { latitude, longitude /* radius */} = req.query;
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
            coordinates:[latitude, longitude],
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

const getmyTrip = async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findById(carId).select('name location pickup drop').exec();

    if (!car) {
      return res.status(404).send("Car not found");
    }

    res.json({
      location: car.location,
      pickup: car.pickup,
      drop: car.drop,
      date: car.Date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createCar,
  getCarList,
  getCar,
  updateCar,
  deleteCar,
  getNearbyCar,
  getmyTrip
};
