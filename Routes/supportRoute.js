const express = require('express');
const router = express.Router();

const AdminContactController = require('../Controller/supportController');

const Admin = require("../Middleware/admin");
const verifyToken = require("../Middleware/verifyToken");


router.post('/create', verifyToken, AdminContactController.createAdminContact);
router.get('/get', verifyToken, AdminContactController.getAdminContact);
router.put('/update/:supportId', verifyToken, AdminContactController.updateAdminContact);
router.delete('/delete/:supportId', verifyToken, AdminContactController.deleteAdminContact);


module.exports = router;
