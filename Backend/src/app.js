import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


// Create app
const app = express();

// Global middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true
}))
app.use('/uploads', express.static("./src/uploads"));

// routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/analytics", analyticsRoutes);


export default app;