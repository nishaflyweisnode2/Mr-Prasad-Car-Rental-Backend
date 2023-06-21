const Brand = require("../Model/brandModel");

const getBrand = async (req, res) => {
  const brands = await Brand.find().sort("name");
  res.send({ msg: brands });
};

const getSingleBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) return res.status(404).send(notFoundError);

  res.send(brand);
};

const createBrand = async (req, res) => {
  const brand = new Brand({ name: req.body.name });
  await brand.save();

  res.status(201).send({ msg: brand });
};

const updateBrand = async (req, res) => {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!brand) return res.status(404).send(notFoundError);

  res.send({ msg: brand });
}

const deleteBrand = async (req, res) =>{
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand) return res.status(404).send("Something went wrong in deleting the brand");

  res.send({ msg:"msg deleted successfully", data: brand })
};

module.exports = {
  getBrand,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand
};