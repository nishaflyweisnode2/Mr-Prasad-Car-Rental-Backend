const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../Controller/privacyPolicyCtrl');

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");

router.post('/privacy-policy', verifyToken, privacyPolicyController.createPrivacyPolicy);
router.get('/privacy-policy', verifyToken, privacyPolicyController.getCurrentPrivacyPolicy);


module.exports = router;
