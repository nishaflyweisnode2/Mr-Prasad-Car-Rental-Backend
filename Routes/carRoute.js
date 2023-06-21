const {
  createCar,
  getCarList,
  getCar,
  updateCar,
  deleteCar,
  getNearbyCar,
  getmyTrip,
} = require("../Controller/carCtrl");

const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/create", createCar);
router.get("/", verifyToken, getCarList);
router.get("/:id", getCar);
router.put("/:id", verifyToken, updateCar);
router.delete("/:id", deleteCar);
router.get("/nearby/get", verifyToken, getNearbyCar);
router.get("/mytrip/:id", getmyTrip);

module.exports = router;
