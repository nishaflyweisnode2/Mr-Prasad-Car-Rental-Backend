const { CreatePaymentOrder, getAllPayments, GetPaymentsById } = require("../Controller/paymentCtrl");

const router = require("express").Router();

router.post("/", CreatePaymentOrder);
router.get("/", getAllPayments);
router.get("/:id", GetPaymentsById);

module.exports = router;
