import express from "express";
import { getAllTests, getTestById, createTest, updateTest, deleteTest } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/allTests", getAllTests); 
router.get("/test/:id", getTestById);
router.post("/test", createTest);
router.put("/test/:id", updateTest);
router.delete("/test/:id", deleteTest); // New route for deleting a test

export default router;
