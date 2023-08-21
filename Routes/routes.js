const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoute"));
router.use("/brand", require("./brandRoute"));
router.use("/car", require("./carRoute"));
router.use("/location", require("./locationRoute"));
router.use("/booking", require("./bookingRoute"));
router.use("/admin", require("./Admin-ROUTE/adminRoute"));
router.use("/myprofile", require("./myProfileRoute"));
router.use("/term", require("./term&conditonRoute"));
router.use("/user", require("./reviewRoute"));
router.use("/payment", require("./paymentRoute"));
router.use("/offer", require("./offerRoute"));

module.exports = router;