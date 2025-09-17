const express = require("express");
const customerController = require("../controller/customerControll");
const { auth, adminOnly } = require("../middleware/Autho");

const customerRouter = express.Router();

// Public routes
customerRouter.post("/create/Customer", customerController.registerUser);
customerRouter.post("/login/Customer", customerController.loginUser);

// Admin routes
customerRouter.get("/read/all", auth, adminOnly, customerController.getAllUsers);
customerRouter.put("/makeAdmin/:userId", auth, adminOnly, customerController.makeAdmin);
customerRouter.put("/removeAdmin/:userId", auth, adminOnly, customerController.removeAdmin);

module.exports = customerRouter;
