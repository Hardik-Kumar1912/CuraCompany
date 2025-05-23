import Transaction from "../models/transaction.model.js";

export const getTransactionsByCompany = async (req, res) => {
    try {
        const companyId = req.query.companyId; // ?companyId=xyz in URL

        console.log("Received companyId:", companyId);
        console.log(typeof companyId);

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }

        const transactions = await Transaction.find({ companyId });

        console.log("Fetched transactions:", transactions);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
