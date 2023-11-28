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
  images: [{ img: { type: String } }],
  videos: [{ vid: { type: String } }],
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
    default: 0,
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
    type: ObjectId,
    ref: 'Location',
  },
  Drop: {
    type: ObjectId,
    ref: 'Location',
  },
  Date: {
    type: Date,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
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
      ref: 'Location',
    }
  },
  rentalCount: {
    type: Number,
    default: 0,
  },
  isCarLock: {
    type: Boolean,
    default: true,
  },
  unavailableInterval: {
    type: Number,
    default: 2,
  },
  isCarAvilable: {
    type: Boolean,
    default: false,
  },
  isOnTrip: {
    type: Boolean,
    default: false,
  },
});

CarSchema.index({ location: '2dsphere' });

const CarModel = mongoose.model("Car", CarSchema);

module.exports = CarModel;
