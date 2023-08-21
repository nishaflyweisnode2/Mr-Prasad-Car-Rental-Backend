const { CreatePaymentOrder, getAllPayments, GetPaymentsById } = require("../Controller/paymentCtrl");

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, CreatePaymentOrder);
router.get("/", Admin, getAllPayments);
router.get("/:id", verifyToken, GetPaymentsById);

module.exports = router;
