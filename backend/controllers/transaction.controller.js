import Transaction from "../models/transaction.model.js";

export const getTransactionsByCompany = async (req, res) => {
    try {
        const companyId = req.query.companyId;

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }

        const transactions = await Transaction.find({ companyId });

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
