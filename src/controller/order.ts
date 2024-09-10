import Order from "../models/order";
import axios from "axios";
import { Request, Response } from "express";

export async function createOrder(req: Request, res: Response) {
  const authToken = req.header("Authorization");
  if (!authToken) {
    return res.status(401).json({ message: "Login to create an order" });
  }
  try {
    const data = await axios.get("http://localhost:3000/api/v1/user/auth", {
      headers: {
        Authorization: authToken,
      },
    });
    const { _id } = data.data.user;
    const { address, orders } = req.body;
    if (!address || !orders) {
      return res.status(400).json({ message: "Cannot create order" });
    }
    const order = new Order({
      userId: _id,
      address,
      orders,
      paymentStatus: "pending",
    });
    await order.save();
    return res
      .status(201)
      .json({ message: "Order successfully created", order });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function updateOrder(req: Request, res: Response) {
  const id = req.params.id;
  const updates = req.body;
  if (!id) {
    return res.status(404).json({ message: "Order cannot be updated." });
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
}
