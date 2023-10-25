const router = require("express").Router();

const {
  createCar,
  uploadCarImageVideo,
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
  addCarForRental,
  addOrUpdateAvailability,
  checkCarAvailability,

} = require("../Controller/carCtrl");

const verifyToken = require("../Middleware/verifyToken");

const upload = require("../Middleware/upload");


router.post("/create", createCar);
router.put('/upload-media/:carId', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'videos', maxCount: 2 },
]), uploadCarImageVideo);
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
router.post('/cars/:carId/availability', verifyToken, addOrUpdateAvailability);
router.get('/cars/availability', verifyToken, checkCarAvailability);



module.exports = router;
