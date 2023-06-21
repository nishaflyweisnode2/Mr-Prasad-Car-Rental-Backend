const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const myProfileSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'user',
  },
  drivingLicense: {
    type :String,
  },
  aadhaarCard: {
    type :String,
  },
  selfie: {
    type :String,
  }
});

const Profile = mongoose.model('Profile', myProfileSchema);

module.exports = Profile;