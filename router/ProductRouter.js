const express = require("express");
const uploadImage = require("../middleware/UploadImage");
const productController = require("../controller/productControll");

const router = express.Router();

// Single image upload
router.post("/create/product", uploadImage.single("prImg"), productController.createProduct);
router.put("/update/product/:id", uploadImage.single("prImg"), productController.updateProduct);

router.get("/read/product", productController.readData);
router.get("/singleProduct/product/:id", productController.ReadSingleData);
router.delete("/delete/product/:id", productController.deleteProduct);

module.exports = router;
