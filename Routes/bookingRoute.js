const {
  createBooking,
  updateBooking,
  getSingleBooking,
  getAllBooking,
  deleteBooking,
  bookingDate,
  bookingTimeRange,
} = require("../Controller/bookingCtrl");
const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createBooking);
router.put("/update/:id",verifyToken, updateBooking);
router.get("/:id", getSingleBooking);
router.get("/", getAllBooking);
router.delete("/:id", Admin, deleteBooking);
router.get("/:id/date", bookingDate);
router.get("/:id/time", bookingTimeRange);

module.exports = router;
