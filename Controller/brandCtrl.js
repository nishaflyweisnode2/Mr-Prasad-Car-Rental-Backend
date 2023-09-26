const Brand = require("../Model/brandModel");

const getBrand = async (req, res) => {
  const brands = await Brand.find().sort("name");
  res.status(201).send({ status: 201, data: brands });
};

const getSingleBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) return res.status(404).send(notFoundError);

  res.status(200).send({ status: 200, data: brand });
};

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brandimage = req.file.path;
    const brand = new Brand({ name, brandimage });
    await brand.save();
    res.status(201).json({ msg: "Create brand successfully", data: brand });
  } catch (error) {
    res.json({
      error: error.message,
    })
  }
};

const updateBrand = async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!brand) return res.status(404).send(notFoundError);

  res.send({ msg: brand });
};

const deleteBrand = async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand)
    return res.status(404).send("Something went wrong in deleting the brand");

  res.send({ msg: "msg deleted successfully", data: brand });
};

module.exports = {
  getBrand,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
