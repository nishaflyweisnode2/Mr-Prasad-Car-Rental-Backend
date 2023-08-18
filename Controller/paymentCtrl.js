const razerpay = require("razorpay");
const crypto = require("crypto");
const uuid = require("uuid");
const id = uuid.v4();
const payment = require("../Model/paymentModel");
const Booking = require("../Model/bookingModel");
const User = require("../Model/authModel");

// const { updateMany } = require("../Model/authModel");

// const Razorpay = new razerpay({
//     key_id: "rzp_live_xhEiJ4uMcMKT1r",
//     key_secret: "JSwRiz3kcqggnJSTohP1pJPy",
// });

// const CreatePaymentOrder = async (req, res) => {
//     // const data = {
//     //     amount: req.body.amount,
//     //     currency: "INR",
//     //     receipt: id,
//     //     partial_payment: false,
//     // };
//     // console.log(data);
//     try {
//         // const result = await Razorpay.orders.create(data);
//         // console.log(result);
//         const DBData = {
//             userId: req.body.userId,
//             name: req.body.name,
//             invoice: "123" + req.body.name,
//             // payment_Id: result.id,
//             amount: req.body.amount,
//             // amount_paid: result.amount,
//             // receipt: result.receipt,
//             bookingId: req.body.bookingId,
//             orderStatus: req.body.orderStatus,
//         };
//         console.log(DBData);
//         const AmountData = await payment.create(DBData);
//         console.log(AmountData);
//         // const wallet = await Wallet.findOne();
//         res.status(200).json({
//             details: AmountData,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({ message: err.message });
//     }
// };





// const CreatePaymentOrder = async (req, res) => {
//   const { userId, bookingId, amount, paymentMethod } = req.body;

//   // Validate the request body
//   if (!userId || !bookingId || !amount || !paymentMethod) {
//     return res.status(400).send("Invalid request body");
//   }

//   // Check if the user exists
//   const user = await User.findOne({ userId });
//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   // Check if the booking exists
//   const booking = await Booking.findOne({ bookingId });
//   if (!booking) {
//     return res.status(404).send("Booking not found");
//   }

//  



const CreatePaymentOrder = async (req, res) => {
  const { userId, bookingId, amount, paymentMethod } = req.body;

  // Validate the request body
  if (!userId || !bookingId || !amount || !paymentMethod) {
    return res.status(400).send("Invalid request body");
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the booking exists
    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    // Create a new payment
    const CreatePayment = new payment({
      userId,
      bookingId,
      amount,
      paymentMethod,
      status: true,
      receipt: "",
      amount_paid: amount,
      type: "given",
      date: new Date(),
    });

    // Save the payment
    const paymentResult = await CreatePayment.save();

    // Update the booking status to 'paid'
    await Booking.findByIdAndUpdate(bookingId, { $set: { status: 'paid' } });

    // Return the new payment
    res.status(201).json({ message: 'Payment created successfully', payment: paymentResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllPayments = async (req, res) => {
    try {
        const Data = await payment.find();
        res.status(200).json({ data: Data });
    } catch (err) {
        console.log(err);
        res.state(400).json({
            message: err.message,
        });
    }
};

const GetPaymentsById = async (req, res) => {
    try {
        const Data = await payment.findById({ _id: req.params.id });
        res.status(200).json({ details: Data });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

    
module.exports = {
  CreatePaymentOrder,
  getAllPayments,
  GetPaymentsById
}