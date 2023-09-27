const DamageProtectionPackage = require('../Model/damageProtectionModel');


const createDamageProtectionPackage = async (req, res) => {
    try {
        const { name, description, price, coverageAmount, mostOpted } = req.body;

        const damageProtectionPackage = new DamageProtectionPackage({ name, description, price, coverageAmount, mostOpted });

        await damageProtectionPackage.save();

        return res.status(201).json({ status: 201, message: 'Damage Protection Package created', data: damageProtectionPackage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllDamageProtectionPackages = async (req, res) => {
    try {
        const damageProtectionPackages = await DamageProtectionPackage.find();

        return res.status(200).json({ status: 200, data: damageProtectionPackages });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    createDamageProtectionPackage,
    getAllDamageProtectionPackages
};
