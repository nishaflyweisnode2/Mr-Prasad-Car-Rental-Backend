const {
  uploadLicense,
  uploadAadharCard,
  uploadSelfie,
} = require("../Controller/myProfileCtrl");
const router = require("express").Router();
const verifyToken = require("../Middleware/verifyToken");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images",
    allowed_formats: ["jpg", "jpeg", "png", "xlsx", "xls"],
  },
});

const upload = multer({ storage: storage });

router.use((err, req, res, next) => {
  if (err.name === "UnhandledPromiseRejection") {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  } else {
    next(err);
  }
});

router.post(
  "/upload/license",
  upload.fields([
    { name: "frontlicense", maxCount: 1 },
    { name: "backlicense", maxCount: 1 },
  ]),
  uploadLicense
);
router.post(
  "/upload/aadhaar",
  upload.fields([
    { name: "frontaadhaar", maxCount: 1 },
    { name: "backaadhaar", maxCount: 1 },
  ]),
  uploadAadharCard
);
router.post(
  "/upload/selfie",
  /* verifyToken, */ upload.single("selfie"),
  uploadSelfie
);

module.exports = router;
