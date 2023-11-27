const router = require("express").Router();

const {
  createCar,
  uploadCarImage,
  uploadCarVideo,
  getCarList,
  getCar,
  updateCar,
  deleteCar,
  getNearbyCar,
  getMyTrip,
  addToFavorites,
  getFavoriteCars,
  becomeHost,
  popularCars,
  getCarLocation,
  updateCarLockStatus,
  addCarForRental,
  addOrUpdateAvailability,
  checkCarAvailability,

} = require("../Controller/carCtrl");

const verifyToken = require("../Middleware/verifyToken");

const { upload, carImage, carVideo } = require("../Middleware/upload");


router.post("/create", createCar);
router.put('/upload-image/:carId', carImage.array('image'), uploadCarImage);
// router.put('/uploadCar-video/:carId', carVideo.array('video'), uploadCarVideo);
router.put('/uploadCar-video/:carId', carVideo.array('video'), (req, res, next) => {
  console.log('Request Files:', req.files);
  next();
}, uploadCarVideo);

// router.put('/upload-video/:carId', upload.fields([
//   { name: 'videos', maxCount: 2 },
// ]), uploadCarImageVideo);
router.get("/", verifyToken, getCarList);
router.get("/:id", getCar);
router.put("/:id", verifyToken, updateCar);
router.delete("/:id", deleteCar);
router.get("/nearby/get", verifyToken, getNearbyCar);
router.get("/mytrip/:userId", getMyTrip);
router.post('/cars/:userId/favorites', verifyToken, addToFavorites);
router.get('/favorite-cars/:userId', verifyToken, getFavoriteCars);
router.post("/become-host/:userId", verifyToken, becomeHost);
router.get('/popular', popularCars);
router.get('/cars/:carId/location/:userId', verifyToken, getCarLocation);
router.put('/cars/:carId/update-lock',  updateCarLockStatus);
router.post('/cars/:carId/availability', verifyToken, addOrUpdateAvailability);
router.get('/cars/availability', verifyToken, checkCarAvailability);



module.exports = router;
