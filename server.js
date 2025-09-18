const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/ProductRouter");
const customerRouter = require("./router/customerRouter");
const orderRoter = require("./router/OrderRouter");
// const orderRouter = require("./postRouter/orderRouter");
const postRoutes = require("./router/postRouter");
// require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Log incoming requests for debugging
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// Static image route
app.use("/AlImages", express.static("imageDocuments"));

// Use routes
app.use(router);
app.use(customerRouter);
app.use(postRoutes);
app.use(orderRoter);
// app.use(orderRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://Some-StotoreDb:NooIu4a6X8RqUE63@cluster0.eyqxqqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Mongoose is connected successfully by feysal");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Ensure PORT fallback in case env is missing
// const PORT = process.env.port || 7000;

app.listen(7000, () => console.log(`Server is running on port `));
