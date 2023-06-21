const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  admin_Name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  mobile_Number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: ""
  },
}, {
  timestamps: true,
});


// PASSWORD - HASH
AdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
});

//MATCH HASH PASSWORD
AdminSchema.methods.isPasswordValid = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

const admin = mongoose.model("admin", AdminSchema);
module.exports = admin;
