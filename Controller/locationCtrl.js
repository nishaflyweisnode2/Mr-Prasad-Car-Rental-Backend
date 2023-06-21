const Location = require("../Model/locationModel");

const createLocation = async (req, res) => {
  const { name, latitude, longitude, type } = req.body;

  try {
    const location = new Location({
      name,
      latitude,
      longitude,
      type,
    });

    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: "Failed to create location" });
  }
};

////////////////////////////////// GET PICKUP AND DROP  LOCATION //////////////////////////////////

const getLocation = async (req, res) => {
  try {
    const { type } = req.query;
    const locations = await Location.find({ type: type });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve locations" });
  }
};

module.exports = {
  createLocation,
  getLocation,
};
