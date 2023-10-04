const Booking = require("../Model/bookingModel");
const Car = require("../Model/carModel");
const Offer = require("../Model/offerModel");

/////////////////////////////// CREATE BOOKING //////////////////////////

// const createBooking = async (req, res) => {
//   try {
//     const { car, user, pickupLocation, dropOffLocation, pickupTime, dropOffTime, from, to, status, price } = req.body;

//     // Validate the request body
//     if (!car || !user || !pickupLocation || !dropOffLocation ||  !pickupTime || !dropOffTime || !from || !to || !status || !price) {
//       res.status(400).send("Invalid request body");
//       return;
//     }

//     // Check if the car is available for the requested dates
//     const carexist = await Car.findById({ _id: car });

//     if (!carexist) {
//       res.status(400).send("Car is not available");
//       return;
//     }

//     // Create the booking
//     const booking = new Booking({
//       car: carexist._id,
//       user,
//       pickupLocation,
//       dropOffLocation,
//       pickupTime,
//       dropOffTime,
//       from,
//       to,
//       status,
//       price,
//     });
//     await booking.save();
//     res.status(201).send({ status: 201, data: booking });
//   } catch (error) {
//     res.status(500).send("Create Booking failed");
//   }

// };

const createBooking = async (req, res) => {
  try {
    const { car, user, pickupLocation, dropOffLocation, pickupTime, dropOffTime, from, to, status, price, offerCode } = req.body;

    if (!car || !user || !pickupLocation || !dropOffLocation || !pickupTime || !dropOffTime || !from || !to || !status || !price) {
      return res.status(400).send("Invalid request body");
    }

    const carexist = await Car.findById({ _id: car });

    if (!carexist) {
      return res.status(400).send("Car is not available");
    }

    const offer = await Offer.findOne({ offerCode });

    if (!offer) {
      return res.status(400).send("Invalid offer code");
    }

    const discountPrice = price - (price * (offer.discountPercentage / 100));
    console.log("discountPrice", discountPrice);
    console.log("offer", offer.discountPercentage);

    const booking = new Booking({
      car: carexist._id,
      user,
      pickupLocation,
      dropOffLocation,
      pickupTime,
      dropOffTime,
      from,
      to,
      status,
      price,
      offerCode,
      discountPrice,
    });

    await booking.save();
    return res.status(201).send({ status: 201, data: booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: 'Create Booking failed', error: error.message });
  }
};

/////////////////////////////// UPDATE BOOKING //////////////////////////

const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndUpdate(id,
      req.body,
      { new: true });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.save();
    return res.status(200).json({ status: 200, message: "updated_Successfully", data: booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
};

/////////////////////////////// GET BOOKING ///////////////////////////////

const getSingleBooking = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const booking = await Booking.findById(id).populate({
      path: "car",
      // select: "name",
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    console.log(booking);
    return res.status(200).json({ status: 200, message: "show_by_id_Successfully", data: booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve booking" });
  }
};

/////////////////////////////// GET ALL BOOKING ///////////////////////////////

const getAllBooking = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const bookings = await Booking.find()
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    return res.status(200).json({ status: 200, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/////////////////////////////// DELETE BOOKING ///////////////////////////////

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    console.log(booking);
    res.status(200).json({ status: 200, data: booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve booking" });
  }
};

//////////////////////////////// SHOW BOOKING DATE //////////////////////////////

const bookingDate = async (req, res) => {
  const date = { ...req.query };
  try {
    // const bookings = await Booking.find({from: { $lte: from },to: { $gte: to },});
    const bookings = await Booking.find(date);

    return res.status(201).json({ status: 201, data: bookings });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
};

////////////////////////////////// BOOKING TIME RANGE ////////////////////////////////

const bookingTimeRange = async (req, res) => {
  const { startTime, endTime } = req.query;

  try {
    const bookings = await Booking.find({
      from: { $lte: endTime },
      to: { $gte: startTime },
    }).populate("car", "name");

    return res.status(201).json({ status: 201, data: bookings });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getSingleBooking,
  getAllBooking,
  deleteBooking,
  bookingDate,
  bookingTimeRange,
};
