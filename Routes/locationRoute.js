const locationController = require("../Controller/locationCtrl");

const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();


router.post('/locations/create', verifyToken, locationController.createLocation);
router.get('/locations/getAll', verifyToken, locationController.getAllLocations);
router.get('/locations/:id', verifyToken, locationController.getLocationById);
router.put('/locations/:id', verifyToken, locationController.updateLocationById);
router.delete('/locations/:id', verifyToken, locationController.deleteLocationById);
router.get('/locations/type/:type', verifyToken, locationController.getLocationsByType);



module.exports = router;
