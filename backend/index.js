import express from "express"; 
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";
import packageRoutes from "./routes/package.routes.js";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/packages",packageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend" , "dist", "index.html"));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
