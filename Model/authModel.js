const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      // unique: true,
      // lowercase: true,
    },
    password: {
      type: String,
      // required: true,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    verified: {
      type: Boolean,
      default: "false",
    },
    favoriteCars: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    }],
    isHost: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);

// PASSWORD - HASH
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSaltSync(10);
//   this.password = await bcrypt.hashSync(this.password, salt);
//   next();
// });

//MATCH HASH PASSWORD
// userSchema.methods.isPasswordValid = async function (enteredPassword) {
//   try {
//     return await bcrypt.compare(enteredPassword, this.password);
//   } catch (error) {
//     throw error;
//   }
// };
