const {
  createLocation,
  getLocation,
} = require("../Controller/locationCtrl");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createLocation);
router.get("/",verifyToken, getLocation);

module.exports = router;
