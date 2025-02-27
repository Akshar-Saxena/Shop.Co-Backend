import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db/db.js";
import {
    loginController,
    profileController,
    registerController,
} from "./controllers/user.controller.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import {
    allProductController,
    newarrivalsController,
    productController,
    topSellingController,
} from "./controllers/product.controller.js";
import {
    addCartController,
    getCartController,
    removeCartController,
} from "./controllers/cart.controller.js";
import { checkoutController } from "./controllers/checkout.controller.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(cookieParser());
app.options("*", cors());

app.get("/", (req, res) => res.json({ message: "Service is available" }));

// User Routes
app.post("/api/v1/users/login", loginController);
app.post("/api/v1/users/register", registerController);
app.get("/api/v1/users/profile", authMiddleware, profileController);

// Product Routes
app.get("/api/v1/products/all", authMiddleware, allProductController);
app.post("/api/v1/products/details", authMiddleware, productController);
app.get("/api/v1/products/newarrivals", authMiddleware, newarrivalsController);
app.get("/api/v1/products/topselling", authMiddleware, topSellingController);

// Cart Routes
app.get("/api/v1/cart/summary", authMiddleware, getCartController);
app.post("/api/v1/cart/add", authMiddleware, addCartController);
app.post("/api/v1/cart/remove", authMiddleware, removeCartController);

// Checkout Route
app.get("/api/v1/checkout", authMiddleware, checkoutController);

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port " + process.env.PORT || 3000 + "...");
});
