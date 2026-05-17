import express from "express";
import {getProducts, createProduct, patchProduct, deleteProduct, getTopProducts} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.post("/", upload.single("image"), createProduct);
router.patch("/", upload.single("image"), patchProduct);
router.delete("/", deleteProduct);


export default router;