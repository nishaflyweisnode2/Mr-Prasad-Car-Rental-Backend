// // Create a multer instance
// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (req, file, cb) => {
//     cb(null, `${file.originalname}.${file.mimetype}`);
//   }
// });

// // Create a file upload middleware
// const upload = multer({ storage });