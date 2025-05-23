import Test from "../models/test.model.js";
import Package from "../models/package.model.js";

export const getAllTests = async (req, res) => {
    try {
		const tests = await Test.find();
		const packages = await Package.find();
		res.status(200).json({ tests, packages });
	} catch (error) {
		console.error("Error fetching tests and packages:", error);
		res.status(500).json({ message: "Error fetching data", error });
	}
};

export const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: "Error fetching test", error });
    }
};

export const createTest = async (req, res) => {
    try {

        const { companyId, noOfTests, price, tests, name, category, type } = req.body;

        if (!companyId || !noOfTests || !price || !tests || !name || !category ||!type) {
            console.error("Missing required fields:", { companyId, noOfTests, price, tests, name, category ,type });
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTest = new Test({
            companyId,
            noOfTests,
            price,
            tests,
            name,
            category,
            type
        });

        const savedTest = await newTest.save();
        res.status(201).json(savedTest);
    } catch (error) {
        console.error("Error creating test:", error);
        res.status(500).json({ message: "Error creating test", error });
    }
};


export const updateTest = async (req, res) => {
    try {
        const { companyId, noOfTests, price, tests, name, category ,type } = req.body;
        const updatedTest = await Test.findByIdAndUpdate(
            req.params.id,
            { companyId, noOfTests, price, tests, name, category ,type },
            { new: true, runValidators: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json(updatedTest);
    } catch (error) {
        res.status(500).json({ message: "Error updating test", error });
    }
};



export const deleteTest = async (req, res) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);

        if (!deletedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json({ message: "Test deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting test", error });
    }
};
