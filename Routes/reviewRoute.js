const createReview = require("../Controller/reviewCtrl");

const router = require("express").Router();

router.post("/cars/:carId/reviews", createReview);

module.exports = router;