// const multer = require('multer');

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//   },
// });

// // File upload limits and file filter
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5 MB
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only image files are allowed.'));
//     }
//   },
// });

// module.exports = upload;





const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "CarRental",
        allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "avi"],
    },
});

const upload = multer({ storage: storage });

const storage1 = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "parsad/Car", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const carImage = multer({ storage: storage1 });
const storage2 = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "parsad/Car", allowed_formats: ["mp4", "mov", "avi", "MP4"], }, });
const carVideo = multer({ storage: storage2 });

module.exports = { upload, carImage, carVideo };