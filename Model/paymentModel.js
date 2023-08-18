const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        require: true
    },
    name: {
        type: String,
        // required: true,
    },
    invoice: {
        type: String,
    },
    amount: {
        type: Number,
        // required: true,
    },
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "booking",
    },
    status: {
        type: Boolean,
        default: false,
    },
    receipt: {
        type: String,
        // required: true,
    },
    amount_paid: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        enum: ["given", "Given", "taken", "Taken", "GIVEN", "TAKEN"],
    },
    date: {
        type: Date,
    },
    paymentMethod: {
        type: String,
        enum: [
            "upi",
            "DebitCard",
            "Debitcard",
            "debitcard",
            "creditcard",
            "CreditCard",
        ],
    },
    // product: {
    //     type: String,
    // },
    orderStatus: {
        type: String,
        default: "Ordered",
        enum: ["Cancelled", "Invoiced", "Ordered"],
    },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
