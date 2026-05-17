import express from "express";
import {getRevenue, getPending, getCategoryPercentages} from "../controllers/analyticController.js";

const router = express.Router();

router.get("/revenue", getRevenue);
router.get("/pending", getPending);
router.get("/categories", getCategoryPercentages);

export default router;