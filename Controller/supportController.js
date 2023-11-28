const AdminContactModel = require('../Model/supportModel');


const createAdminContact = async (req, res) => {
    try {
        const { email, mobile } = req.body;

        const adminContact = new AdminContactModel({
            email,
            mobile,
        });

        await adminContact.save();

        return res.status(201).json({ status: 201, message: 'contact information saved successfully', data: adminContact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to save contact information', error: error.message });
    }
};


const getAdminContact = async (req, res) => {
    try {
        const adminContact = await AdminContactModel.findOne();
        if (!adminContact) {
            return res.status(404).json({ error: 'contact information not found' });
        }

        return res.status(200).json({ status: 200, data: adminContact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to retrieve contact information', error: error.message });
    }
};


const updateAdminContact = async (req, res) => {
    try {
        const supportId = req.params.supportId;
        const { email, mobile } = req.body;

        const adminContact = await AdminContactModel.findById({ _id: supportId });
        if (!adminContact) {
            return res.status(404).json({ error: 'contact information not found' });
        }

        adminContact.email = email;
        adminContact.mobile = mobile;

        await adminContact.save();

        return res.status(200).json({ status: 200, message: 'contact information updated successfully', data: adminContact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to update admin contact information', error: error.message });
    }
};



const deleteAdminContact = async (req, res) => {
    try {
        const supportId = req.params.supportId;

        let adminContact = await AdminContactModel.findById(supportId);
        if (!adminContact) {
            return res.status(404).json({ error: 'Admin contact information not found' });
        }

        adminContact = await AdminContactModel.findByIdAndDelete(supportId)

        return res.status(200).json({ status: 200, message: 'contact information deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to delete contact information', error: error.message });
    }
};



module.exports = {
    createAdminContact,
    getAdminContact,
    updateAdminContact,
    deleteAdminContact,
};
