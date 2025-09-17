const express = require("express");
const orderController = require("../controller/orderControler");
const orderRouter = express.Router();

orderRouter.post("/create/order", orderController.createOrder);
orderRouter.get("/read/orders", orderController.readOrders);
orderRouter.patch("/mark-single-delivered/order/:id", orderController.markDeliveredOrder);
orderRouter.delete("/delete/order/:id", orderController.deleteOrder);

module.exports = orderRouter;
