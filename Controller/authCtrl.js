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

    const user = await User.findOne({ name, mobile });
    if (!user) {
      return createResponse(res, 404, "User not found");
    }
    const otp = OTP.generateOTP();

    const token = OTP.generateJwtToken(user._id);
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

const resendOTP = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    const otp = OTP.generateOTP();
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
    const accountVerification = false;
    const updated = await User.findOneAndUpdate(
      { _id: user._id },
      { otp, otpExpiration, accountVerification },
      { new: true }
    );
    let obj = {
      id: updated._id,
      otp: updated.otp,
      phone: updated.phone,
    };
    res.status(200).send({ status: 200, message: "OTP resent", data: obj });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: 500, message: "Server error" + error.message });
  }
};

const ForgetPassword = async (req, res) => {
  const { mobile } = req.body;
  try {
    const user = await User.findOne({ mobile }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Number not found" });
    }
    const otp = OTP.generateOTP();
    user.otp = otp;
    await user.save();
    // await twilioClient.messages.create({
    //   body: `Your OTP for password reset is: ${otp}`,
    //   from: "YOUR_TWILIO_PHONE_NUMBER",
    //   to: user.mobile,
    // });
    res.json({ message: "OTP sent successfully", otp: otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
};

module.exports = {
  createUser,
  loginUser,
  verifyOTP,
  getAllUser,
  getByUser,
  updateUser,
  deleteUser,
  resendOTP,
  ForgetPassword,
};
