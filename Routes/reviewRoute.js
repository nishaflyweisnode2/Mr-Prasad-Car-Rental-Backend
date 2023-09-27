const auth = require("../Controller/reviewCtrl");

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/cars/:carId/reviews", verifyToken, auth.createReview);
router.get('/cars/:carId/reviews', verifyToken, auth.getReviewsForCar);


module.exports = router;