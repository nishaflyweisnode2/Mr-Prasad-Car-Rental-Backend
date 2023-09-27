const CancellationPolicy = require('../Model/cancellationPolicyModel');



const createCancellationPolicy = async (req, res) => {
  try {
    const { content } = req.body;

    const cancellationPolicy = new CancellationPolicy({ content });

    await cancellationPolicy.save();

    return res.status(201).json({ status: 201, message: 'Cancellation Policy created', data: cancellationPolicy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCurrentCancellationPolicy = async (req, res) => {
  try {
    const cancellationPolicy = await CancellationPolicy.findOne().sort('-lastUpdated');

    if (!cancellationPolicy) {
      return res.status(404).json({ message: 'Cancellation Policy not found' });
    }

    return res.status(200).json({ status: 200, data: cancellationPolicy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  createCancellationPolicy,
  getCurrentCancellationPolicy,
};

