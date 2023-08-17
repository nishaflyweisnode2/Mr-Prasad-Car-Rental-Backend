const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const myProfileSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "user",
  },
  drivingLicense: {
    front: String,
    back: String,
  },
  aadhaarCard: {
    front: String,
    back: String,
  },
  selfie: String,
});

const Profile = mongoose.model("Profile", myProfileSchema);

module.exports = Profile;