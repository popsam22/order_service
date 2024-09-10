import { Document, model, Schema } from "mongoose";

interface Product {
  productId: string;
  price: number;
  quantity: number;
}

interface IOrder extends Document {
  userId: string;
  address: string;
  orderAmount: number;
  orders: Product[];
  paymentStatus: "paid" | "pending";
}

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    address: { type: String, required: true },
    orderAmount: { type: Number },
    orders: [
      {
        productId: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    paymentStatus: { type: String, enum: ["paid", "pending"], required: true },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
