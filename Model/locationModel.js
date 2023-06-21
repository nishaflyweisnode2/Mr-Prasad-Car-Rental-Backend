const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['pickup', 'drop'],
    required: true,
  },
});

const locationModel = mongoose.model('location', locationSchema);


module.exports = locationModel;
