import express from "express";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from './routes/index.js'

// Environment configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const DB_URL = `${process.env.DB}`;
const SERVER = `${process.env.SERVER}`;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(DB_URL)
.then(() => console.log("Database connection successful"))
.catch((err) => console.error("Database connection failed", err));

// Routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${SERVER}${PORT}`);
});