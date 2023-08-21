const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const CarSchema = new mongoose.Schema({
  owner: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  brand: {
    type: ObjectId,
    ref: 'Brand',
  },
  year: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    default: "",
  },
  numberOfSeats: {
    type: Number,
  },
  numberOfDoors: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["Diesel", "CNG", "Petrol"],
    required: [true, "can't be blank"],
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
    default: "Manual",
  },
  airConditioner: {
    type: Boolean,
    default: false,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
  engineHP: {
    type: Number,
  },
  Airbag: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: Number,
    required: true,
  },
  pickup: {
    type: String,
  },
  Drop: {
    type: String,
  },
  Date: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true
    },
  },
  aboutCar: {
    type: String,
  },
  carLocation: {
    address: {
      address: String,
      State: String,
      city: String,
      pincode: String,
    },
    geolocation: {
      type: ObjectId,
      ref: 'location',
      // required: true,
    }
  },
  rentalCount: {
    type: Number,
    default: 0,
  },
});

CarSchema.index({ location: '2dsphere' });

const CarModel = mongoose.model("Car", CarSchema);

module.exports = CarModel;
