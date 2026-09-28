import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../routes/auth.route.js";
import productRoutes from "../routes/product.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "YOUR_RENDER_FRONTEND_URL"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
