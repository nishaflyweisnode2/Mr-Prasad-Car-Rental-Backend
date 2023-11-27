const Location = require("../Model/locationModel");




const createLocation = async (req, res) => {
  const { name, coordinates, type } = req.body;

  try {
    const location = new Location({
      name,
      coordinates,
      type,
    });

    const savedLocation = await location.save();
    return res.status(201).json(savedLocation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create location" });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    return res.json(locations);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve locations" });
  }
};

// Get a specific location by ID
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    return res.json(location);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve location" });
  }
};

// Update a location by ID
const updateLocationById = async (req, res) => {
  const { name, coordinates, type } = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      {
        name,
        coordinates,
        type,
      },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.json(updatedLocation);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update location" });
  }
};

// Delete a location by ID
const deleteLocationById = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.json(deletedLocation);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete location" });
  }
};

const getLocationsByType = async (req, res) => {
  try {
  const { type } = req.params;

    const locations = await Location.find({ type: type });
    console.log(locations);

    if (locations && locations.length > 0) {
      return res.json(locations);
    } else {
      return res.status(404).json({ message: `No locations found for type: ${type}` });
    }
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: `Failed to retrieve locations for type: ${type}` });
  }
};




module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
  getLocationsByType
};
