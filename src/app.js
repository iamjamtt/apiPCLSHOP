import express from "express";
import morgan from "morgan";
// Routes
import apiRoutes from "./routes/api.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

export default app;
