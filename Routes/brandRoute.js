const {
  createBrand,
  getBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} = require("../Controller/brandCtrl");

const verifyToken = require("../Middleware/verifyToken");
const router = require("express").Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/CarBrand",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "PNG",
      "xlsx",
      "xls",
      "pdf",
      "PDF",
      "avif",
    ],
  },
});
const upload = multer({ storage: storage });

router.post("/create", verifyToken, upload.single("Brandimage"), createBrand);
router.get("/",verifyToken, getBrand);
router.get("/:id", getSingleBrand);
router.put("/:id",verifyToken, updateBrand);
router.delete("/:id",verifyToken, deleteBrand);

module.exports = router;
