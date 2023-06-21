const Profile = require("../Model/myProfileModel");
const cloudinary = require("cloudinary");

const uploadLicense = async (req, res) => {
  const file = req.file;
  

  // Check if the file type is allowed
  const allowedFileTypes = ["jpg", "jpeg", "png"];
  if (!allowedFileTypes.includes(file.originalname.split('.')[1].toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'Only JPG, JPEG, and PNG images are allowed'
    });
  }

  // Upload the file to Cloudinary
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Images",
    });

    // Save the file's secure URL in the database
    const profile = new Profile({
      drivingLicense: result.secure_url
    });
    await profile.save();

    // Return a success message
    res.json({ success: true, message: 'License uploaded successfully' });
  } catch (error) {
    // Handle the error
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload the license'
    });
  }
};

const uploadAadharCard = async (req, res) => {

  const file = req.file;
  

  // Check if the file type is allowed
  const allowedFileTypes = ["jpg", "jpeg", "png"];
  if (!allowedFileTypes.includes(file.originalname.split('.')[1].toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'Only JPG, JPEG, and PNG images are allowed'
    });
  }


  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Images",
    });

    const profile = new Profile({
      aadhaarCard: result.secure_url
    });

    await profile.save();

    res.json({ success: true, message: 'Aadhaar card uploaded successfully' });
  } catch (error) {
    console.error('Error uploading Aadhaar card', error);
    res.status(500).json({ success: false, message: 'Failed to upload Aadhaar card' });
  }
};

const uploadSelfie = async (req, res) => {

  const file = req.file;
  

  // Check if the file type is allowed
  const allowedFileTypes = ["jpg", "jpeg", "png"];
  if (!allowedFileTypes.includes(file.originalname.split('.')[1].toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'Only JPG, JPEG, and PNG images are allowed'
    });
  }


  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Images",
    });

    const profile = new Profile({
      selfie: result.secure_url
    });

    console.log(profile);

    await profile.save();

    res.json({ success: true, message: 'Selfie uploaded successfully' });
  } catch (error) {
    console.error('Error uploading selfie', error);
    res.status(500).json({ success: false, message: 'Failed to upload selfie' });
  }
};

module.exports = {
  uploadLicense,
  uploadAadharCard,
  uploadSelfie
};



// const createProfile = async (req, res) => {
// const drivingLicenseFilename = req.file.filename;

// // Check if the file is a valid image file
// const fileExtension = drivingLicenseFilename.split(".")[1];
// if (!fileExtension.toLowerCase() in ["jpg", "jpeg", "png"]) {
// return res.status(400).send("Invalid file type. Only JPG, JPEG, and PNG files are allowed.");
// }

// // Check if the file is too large
// const fileSize = req.file.size;
// if (fileSize > 1000000) {
// return res.status(400).send("File is too large. The maximum file size is 1MB.");
// }

// // Update the user's profile
// const profile = await Profile.findOneAndUpdate({ _id: req.user._id }, { panCard: drivingLicenseFilename }, { new: true });

// // Return a success message
// if (profile) {
// res.status(200).send("Profile updated successfully");
// } else {
// res.status(500).send("An error occurred while updating the profile");
// }
// };





