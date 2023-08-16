const { uploadLicense, uploadAadharCard, uploadSelfie } = require("../Controller/myProfileCtrl");
const router = require("express").Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

// Configure multer to use Cloudinary as storage destination
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "xlsx", "xls"], // allowed file formats
  },
});

const verifyToken = require("../Middleware/verifyToken");

const upload = multer({ storage: storage });

router.use((err, req, res, next) => {
  if (err.name === 'UnhandledPromiseRejection') {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } else {
    next(err);
  }
});

router.post('/upload/license', /* verifyToken, */ upload.single('license'), uploadLicense)
router.post('/upload/aadhaar', /* verifyToken, */ upload.single('aadhaar'), uploadAadharCard)
router.post('/upload/selfie', /* verifyToken, */ upload.single('selfie'), uploadSelfie)

// Handle unhandled promise rejections


module.exports = router;





























// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split('.').pop();
//     const fileName = `${Date.now()}.${ext}`;
//     cb(null, fileName);
//   }
// });

// const upload = multer({ storage: storage });

// const router = require("express").Router();

// router.post('/profile', upload.single('file'), createProfile);


