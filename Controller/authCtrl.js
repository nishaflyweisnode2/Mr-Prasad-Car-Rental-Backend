const User = require("../Model/authModel");
const OTP = require("../Config/OTP-Token")
const { createResponse } = require("../utils/response");

////////////////////////////////////////// CREATE USER /////////////////////////////////

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [
        { email: req.body.email },
        { mobile: req.body.mobile }
      ]
    });

    if (existingUser) {
      // Check if email and mobile match
      if (existingUser.email === req.body.email && existingUser.mobile === req.body.mobile) {
        return createResponse(res, 409, "Email address already in use");
      } else if (existingUser.mobile){
        // Email and mobile don't match, but user exists
        return createResponse(res, 400, "mobile already in use");
      } else {
        return createResponse(res, 400, "Email and Mobile already in use");
      }
    }
    // Generate OTP
    const otp = OTP.generateOTP();

    const newUser = new User({ ...req.body, otp, });

    await newUser.save();

    console.log("User created", newUser);

    // Send a response indicating that the user was successfully created
    return createResponse(res, 201, "User created successfully", {
      user: newUser,
      otp: otp,
    });
  } catch (error) {
    console.log("Internal server error", error);
    // return createResponse(res, 500, "Internal server error");
  }
};

////////////////////////////////////////// lOGIN USER ///////////////////////////////////

const loginUser = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    // Find the user by login name and mobile number
    const user = await User.findOne({ name, mobile });
    if (!user) {
      return createResponse(res, 404, "User not found");
    }
    // Generate OTP
    const otp = OTP.generateOTP();

    const token = OTP.generateJwtToken(user._id);

    // Save the generated OTP to the user object
    user.otp = otp;
    await user.save();

    // Send OTP to the user (example code)
    // sendOTP(user.mobileNumber, otp);
res.setHeader("x-api-key", /* "Bearer "*/ +token);
    return createResponse(res, 200, "OTP sent for verification", {
      userId: user._id,
      token,
      otp
    });
  } catch (error) {
    console.log("Internal server error", error);
    return createResponse(res, 500, "Internal server error");
  }
};

////////////////////////////////////////// USER OTP VERIFICATION /////////////////////////

const verifyOTP = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "you are not found" });
    }

    if (user.otp != req.body.otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    const token = OTP.generateJwtToken(user._id);
    return createResponse(res, 200, "OTP Verify Successfully", {
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
}


const getByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
}


const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
}



const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
}




module.exports = {
  createUser,
  loginUser,
  verifyOTP,
  getAllUser,
  getByUser,
  updateUser,
  deleteUser
};
