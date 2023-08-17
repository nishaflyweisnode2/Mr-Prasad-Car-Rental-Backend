const {
  createUser,
  loginUser,
  verifyOTP,
  getAllUser,
  getByUser,
  deleteUser,
  updateUser,
  resendOTP,
  ForgetPassword,
  resetName,
} = require("../Controller/authCtrl");
const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/verify-otp/:id", verifyOTP);
router.get("/user"  , getAllUser);
router.get("/user/:id", verifyToken, getByUser);
router.put("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", /* Admin, */ deleteUser);
router.post("/resendOtp/:id", resendOTP);
router.post("/forget", ForgetPassword);
router.post("/reset/name", verifyToken, resetName);

module.exports = router;
