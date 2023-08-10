const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: true,
      default: ""
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
      default : "user"
    }
  },
  { timestamps: true }
);


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

module.exports = mongoose.model("user", userSchema);
