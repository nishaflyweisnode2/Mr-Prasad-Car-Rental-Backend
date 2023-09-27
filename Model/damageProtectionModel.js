const mongoose = require('mongoose');

const damageProtectionPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverageAmount: {
    type: Number,
    required: true,
  },
  mostOpted: {
    type: Boolean,
    default: false,
  },
});

const DamageProtectionPackage = mongoose.model('DamageProtectionPackage', damageProtectionPackageSchema);

module.exports = DamageProtectionPackage;
