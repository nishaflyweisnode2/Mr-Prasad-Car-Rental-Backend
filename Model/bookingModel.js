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
      ref: 'user'
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
      type: Date,
      default: null,
    },
    dropOffTime: {
      type: Date,
      default: null,
    },
    isTimeExtended: {
      type: Boolean,
      default: false,
    },
    extendedDropOffTime: {
      type: String,
      default: null,
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
      enum: ["PENDING", "PAID", "RESERVED", "CANCELLED"],
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
    tripStartTime: {
      type: Date,
      default: null,
    },
    tripEndTime: {
      type: Date,
      default: null
    },
    isTripCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
