const Profile = require("../Model/myProfileModel");
const User = require("../Model/authModel");
const cloudinary = require("cloudinary");

const uploadLicense = async (req, res) => {
  const { userId } = req.body;
  const frontImagePath = req.files["frontlicense"][0].filename;
  const backImagePath = req.files["backlicense"][0].filename;

  try {
    const profile = new Profile({
      userId,
      drivingLicense: {
        front: frontImagePath,
        back: backImagePath,
      },
    });

    await User.findByIdAndUpdate(userId, { verified: true });
    await profile.save();

    res.json({
      success: true,
      message: "License uploaded successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to upload the license",
    });
  }
};

const uploadAadharCard = async (req, res) => {
  const { userId } = req.body;
  const frontImagePath = req.files["frontaadhaar"][0].filename;
  const backImagePath = req.files["backaadhaar"][0].filename;

  try {
    const profile = new Profile({
      userId,
      aadhaarCard: {
        front: frontImagePath,
        back: backImagePath,
      },
    });

    await User.findByIdAndUpdate(userId, { verified: true });
    await profile.save();

    res.json({
      success: true,
      message: "Aadhaar card uploaded successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error uploading Aadhaar card", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to upload Aadhaar card" });
  }
};

const uploadSelfie = async (req, res) => {
  const file = req.file;
  const { userId } = req.body;

  // Check if the file type is allowed
  const allowedFileTypes = ["jpg", "jpeg", "png"];
  if (
    !allowedFileTypes.includes(file.originalname.split(".")[1].toLowerCase())
  ) {
    return res.status(400).json({
      success: false,
      message: "Only JPG, JPEG, and PNG images are allowed",
    });
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Images",
    });

    await User.findByIdAndUpdate(userId, { verified: true });

    const profile = new Profile({
      userId,
      selfie: result.secure_url,
    });

    await profile.save();

    res.json({
      success: true,
      message: "Selfie uploaded successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error uploading selfie", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to upload selfie" });
  }
};

module.exports = {
  uploadLicense,
  uploadAadharCard,
  uploadSelfie,
};
