const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
});

const AdminContactModel = mongoose.model('Support', supportSchema);

module.exports = AdminContactModel;
