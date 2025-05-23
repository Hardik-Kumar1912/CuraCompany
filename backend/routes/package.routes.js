import express from "express";
import { createPackage , deletePackage, updatePackage , getPackageById } from "../controllers/package.controller.js";

const router = express.Router();

router.post("/package", createPackage);
router.delete("/package/:id", deletePackage);
router.put("/package/:id", updatePackage);
router.get("/package/:id", getPackageById);

export default router;