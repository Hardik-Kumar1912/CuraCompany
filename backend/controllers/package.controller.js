import Package from "../models/package.model.js";

export const createPackage = async (req, res) => {
    try {
        const { name, bestPrice, packageCategory , noOfTests , tests , companyId} = req.body;

        if (!name || !bestPrice || !packageCategory || !noOfTests || !tests || !companyId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newPackage = new Package({
            name,
            bestPrice,
            packageCategory,
            noOfTests,
            tests,
            companyId
        });

        await newPackage.save();

        res.status(201).json({ message: "Package created successfully", newPackage });
    } catch (error) {
        console.log("Error in createPackage controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deletePackage = async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);

        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Package", error });
    }
};

export const updatePackage = async (req, res) => {
    try {
        const { companyId, noOfTests, bestPrice, tests, name, packageCategory ,type } = req.body;
        const updatedTest = await Package.findByIdAndUpdate(
            req.params.id,
            { companyId, noOfTests, bestPrice, tests, name, packageCategory ,type },
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

export const getPackageById = async (req, res) => {
    try {
        const test = await Package.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: "Error fetching package", error });
    }
};
