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
  addCarForRental

} = require("../Controller/carCtrl");

const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

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

module.exports = router;
