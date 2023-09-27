const mongoose = require('mongoose');


const cancellationPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

const CancellationPolicy = mongoose.model('CancellationPolicy', cancellationPolicySchema);

module.exports = CancellationPolicy;
