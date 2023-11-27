const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: true,
  },
  type: {
    type: String,
    enum: ['pickup', 'drop'],
    required: true,
  },
});

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;
