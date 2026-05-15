import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCart);
router.post("/add", protect, addToCart);
router.post("/remove", removeFromCart);

export default router;
