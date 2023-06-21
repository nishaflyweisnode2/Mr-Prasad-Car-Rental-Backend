const { signUpAdmin, loginAdmin, ForgetPassword } = require("../../Controller/Admin-CTRL/adminCtrl");

const router = require("express").Router();

router.post("/create", signUpAdmin);
router.post("/login", loginAdmin);
router.post("/forget", ForgetPassword);

module.exports = router;