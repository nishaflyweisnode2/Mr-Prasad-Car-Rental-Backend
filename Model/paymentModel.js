const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    name: {
        type: String,
    },
    invoice: {
        type: String,
    },
    amount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        type: Number
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
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
    },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
