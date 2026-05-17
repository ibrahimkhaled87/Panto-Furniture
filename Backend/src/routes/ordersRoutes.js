import express from "express";
import {getOrders, getOrderInfo, postOrder, patchOrder, webhook} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderInfo);
router.post("/", postOrder);
router.post("/webhook", webhook);
router.patch("/", patchOrder);


export default router;