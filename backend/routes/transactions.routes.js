import express from "express";
import { getTransactionsByCompany } from "../controllers/transaction.controller.js";

const router = express.Router();

// Route: GET /api/transactions?companyId=xyz
router.get("/", getTransactionsByCompany);

export default router;
