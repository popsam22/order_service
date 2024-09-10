import { Router } from "express";
import { createOrder, getAllOrders, updateOrder } from "../controller/order";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.patch("/update-order/:id", updateOrder);

export default router;
