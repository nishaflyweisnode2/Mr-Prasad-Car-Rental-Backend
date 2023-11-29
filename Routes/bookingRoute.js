const {
  createBooking,
  updateBooking,
  getSingleBooking,
  getAllBooking,
  deleteBooking,
  bookingDate,
  bookingTimeRange,
  extendBooking,
  bookingsExtendedTimes,
  updateBookingStatus,
  getBookingsByUser,

} = require("../Controller/bookingCtrl");
const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/create", verifyToken, createBooking);
router.put("/update/:id", verifyToken, updateBooking);
router.get("/:id", getSingleBooking);
router.get("/", getAllBooking);
router.get('/bookings/:userId', getBookingsByUser);
router.delete("/:id", Admin, deleteBooking);
router.get("/:id/date", bookingDate);
router.get("/:id/time", bookingTimeRange);
router.put("/extend-booking/:bookingId", verifyToken, extendBooking);
router.post("/extended-times", verifyToken, bookingsExtendedTimes);
router.put("/:id/update-status", updateBookingStatus);


module.exports = router;
