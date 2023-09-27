const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

module.exports = PrivacyPolicy;
