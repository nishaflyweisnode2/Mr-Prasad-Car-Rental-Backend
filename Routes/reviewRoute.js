const createReview = require("../Controller/reviewCtrl");

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/cars/:carId/reviews", createReview);

module.exports = router;