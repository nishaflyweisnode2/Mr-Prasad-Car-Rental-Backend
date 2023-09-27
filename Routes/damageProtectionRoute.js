const express = require('express');
const router = express.Router();
const damageProtectionPackageController = require('../Controller/damageProtectionCtrl');

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");


router.post('/damage-protection-package', verifyToken, damageProtectionPackageController.createDamageProtectionPackage);
router.get('/damage-protection-packages', verifyToken, damageProtectionPackageController.getAllDamageProtectionPackages);


module.exports = router;
