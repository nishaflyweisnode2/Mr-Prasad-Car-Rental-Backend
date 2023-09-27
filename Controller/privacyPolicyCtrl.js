const PrivacyPolicy = require('../Model/privacyPolicyModel');



const createPrivacyPolicy = async (req, res) => {
    try {

        const { content } = req.body;

        const privacyPolicy = new PrivacyPolicy({ content });

        await privacyPolicy.save();

        return res.status(201).json({ status: 201, message: 'Privacy Policy created', data: privacyPolicy });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getCurrentPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.find();

        if (!privacyPolicy) {
            return res.status(404).json({ message: 'Privacy Policy not found' });
        }

        return res.status(200).json({ status: 200, data: privacyPolicy });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




module.exports = {
    createPrivacyPolicy,
    getCurrentPrivacyPolicy,
};
