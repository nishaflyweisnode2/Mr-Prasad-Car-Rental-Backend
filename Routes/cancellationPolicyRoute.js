const express = require('express');
const router = express.Router();
const cancellationPolicyController = require('../Controller/cancellationPolicyCtrl');

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");


router.post('/cancellation-policy', verifyToken, cancellationPolicyController.createCancellationPolicy);
router.get('/cancellation-policy', verifyToken, cancellationPolicyController.getCurrentCancellationPolicy);



module.exports = router;
