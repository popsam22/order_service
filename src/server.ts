import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import OrderRoutes from "./routes/order";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Product service running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/v1/order", OrderRoutes);
