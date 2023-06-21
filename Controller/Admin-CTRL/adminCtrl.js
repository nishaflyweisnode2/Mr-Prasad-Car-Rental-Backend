const Admin = require("../../Model/adminModel")
const OTP = require("../../Config/OTP-Token")
const crypto = require('crypto');
const { createResponse } = require("../../utils/response");

const signUpAdmin = async (req, res) => {
  const {email, mobile_Number} = req.body;

  // Check if user already exist
  const Existing = await Admin.findOne({
    $or: [
      { email: req.body.email },
      { mobile_Number: req.body.mobile_Number }
    ]
  });
  if (Existing) {
    return res.send("Already existing");
  }
  const otp = OTP.generateOTP();
  const newUser = new Admin({ ...req.body, otp, });
  await newUser.save();

  // Send a response indicating that the user was successfully created
  return createResponse(res, 201, "User created successfully", {
    user: newUser,
    otp: otp,
  });
};


const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    };

    // Find the user by login email and mobile number
    const admin = await Admin.findOne({email});
    if (!admin) {
      return createResponse(res, 404, "Admin not found");
    }
    // Generate OTP
    const otp = OTP.generateOTP();

    const token = OTP.generateJwtToken(admin._id);

    // Save the generated OTP to the user object
    admin.otp = otp;
    await admin.save();

    // Send OTP to the user (example code)
    // sendOTP(user.mobileNumber, otp);

    return createResponse(res, 200, "OTP sent for verification", {
      adminId: admin._id,
      token,
      otp
    });
  
  } catch (error) {
    console.log("Internal server error", error);
    return createResponse(res, 500, "Internal server error");
  }
 
};

const ForgetPassword = async (req, res) => {
    const { name, email, mobile_Number, subject, message } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            // port: 465,
            port: 587,
            // secure: true,
            secure: false,
            auth: {
                user: "info@flyweis.technology",
                pass: "ygkojtgemllsgpgs",
                // user: "tollernuts@gmail.com",
                // pass: "Toller@123",
            },
        });

        var mail = {
            from: "node3@flyweis.technology",
            // to: "info@flyweis.technology",
            to: "node1@flyweis.technology",
            subject: `${email} want to contact you`,
            text: `Name: ${name}, Phone: ${mobile_Number}, Subject: ${subject} , Message : ${message}`,
        };

        transporter.sendMail(mail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        let xhr = new XMLHttpRequest();
        xhr.open("post", "/addContactData");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onload = function () {
            console.log(xhr.responseText);
        };

        return res.status(200).json({ msg: "Message send successfully" });
    } catch (error) {
        return res.status(500).json({ errors: "something went wrong" });
    }
};


module.exports = {
  signUpAdmin,
  loginAdmin,
  ForgetPassword
}
