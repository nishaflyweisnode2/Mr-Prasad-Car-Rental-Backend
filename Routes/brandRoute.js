const {
  createBrand,
  getBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} = require("../Controller/brandCtrl");

const verifyToken = require("../Middleware/verifyToken");

const router = require("express").Router();

router.post("/create",verifyToken, createBrand);
router.get("/",verifyToken, getBrand);
router.get("/:id", getSingleBrand);
router.put("/:id",verifyToken, updateBrand);
router.delete("/:id",verifyToken, deleteBrand);

module.exports = router;
