const mongoose = require("mongoose");
const moment = require("moment");

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: ObjectId,
      required: [true, "can't be blank"],
      ref: "Car",
    },
    user: {
      type: ObjectId,
      required: [true, "can't be blank"],
      ref: 'User'
    },
    pickupLocation: {
      type: ObjectId,
      required: [true, "can't be blank"],
      ref: "Location",
    },
    dropOffLocation: {
      type: ObjectId,
      required: [true, "can't be blank"],
      ref: "Location",
    },
    pickupTime: {
      type: String,
      default: ""
      // required: [true, "can't be blank"],
    },
    dropOffTime: {
      type: String,
      default: "",
      // required: [true, "can't be blank"],
    },
    from: {
      type: String,
      required: [true, "can't be blank"],
    },
    to: {
      type: String,
      required: [true, "can't be blank"],
    },
    status: {
      type: String,
      enum: ["PENDING", "DEPOSIT", "PAID", "RESERVED", "CANCELLED"],
      default: "PENDING",
      required: [true, "can't be blank"],
    },
    price: {
      type: Number,
      required: [true, "can't be blank"],
    },
    offerCode: {
      type: String,
    },
    discountPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
