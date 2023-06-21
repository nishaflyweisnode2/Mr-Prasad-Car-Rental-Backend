const httpError = require("http-errors");
const TermsAndConditions = require("../Model/term&conditionModel");

// GET all terms and conditions
const getAllTerms = async (req, res, next) => {
    try {
        const termsAndConditions = await TermsAndConditions.find({
            type: "TERMS&CONDITION",
        });
        if (termsAndConditions.length === 0) {
            res.status(400).send({ success: false, message: "Terms and conditions not found" });
        }
        res.json(termsAndConditions).json("Get All successfully completed");;
    } catch (err) {
        next(httpError(500, err),"Something went wrong");
    }
};

// GET a single terms and conditions by ID
const getTermById = async (req, res, next) => {
    try {
        const termsAndConditions = await TermsAndConditions.findById(
            req.params.id
        );
        if (!termsAndConditions) {
            throw httpError(404, "Terms and conditions not found");
        }
        res.json(termsAndConditions).json("get by ID successfully completed");;
    } catch (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
            return next(httpError(400, "Invalid terms and conditions ID"));
        }
        next(httpError(500, err),"Something went wrong to get by ID");
    }
};

// CREATE a new terms and conditions
const createTerm = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) {
            throw httpError(400, "Content is required");
        }
        const Obj = {
            type: "TERMS&CONDITION",
            content: content,
        };
        const termsAndConditions = await TermsAndConditions.create(Obj);
        res.status(201).json(termsAndConditions);
    } catch (err) {
        next(httpError(500, err));
    }
};

// UPDATE a terms and conditions by ID
const updateTerm = async (req, res, next) => {
    try {
        const { content,type } = req.body;
        if (!content) {
            throw httpError(400, "Content is required");
        }
        const termsAndConditions = await TermsAndConditions.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );
        if (!termsAndConditions) {
            throw httpError(404, "Terms and conditions not found");
        }
        res.json(termsAndConditions).json("Update successfully completed");
    } catch (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
            return next(httpError(400, "Invalid terms and conditions ID"));
        }
        next(httpError(500, err));
    }
};

// DELETE a terms and conditions by ID
const deleteTerm = async (req, res, next) => {
    try {
        const termsAndConditions = await TermsAndConditions.findByIdAndDelete(
            req.params.id
        );
        if (!termsAndConditions) {
            throw httpError(404, "Terms and conditions not found");
        }
        res.sendStatus(204).json("Delete Successful");
    } catch (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
            return next(httpError(400, "Invalid terms and conditions ID"));
        }
        next(httpError(500, err));
    }
};

module.exports = {
  getAllTerms,
  getTermById,
  createTerm,
  updateTerm,
  deleteTerm
}