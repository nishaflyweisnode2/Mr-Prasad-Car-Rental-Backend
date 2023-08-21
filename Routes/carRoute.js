const router = require("express").Router();

const {
  createCar,
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
  addCarForRental

} = require("../Controller/carCtrl");

const verifyToken = require("../Middleware/verifyToken");

router.post("/create", createCar);
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
router.get('/cars/:carId/location/:userId', getCarLocation);


module.exports = router;
