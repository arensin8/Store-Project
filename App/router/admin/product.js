const productController = require("../../http/controllers/admin/product.controller");
const {ProductController} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/all", ProductController.getAllProducts);
router.post("/add",uploadFile.array("images", 10),stringToArray("tags", "colors"),ProductController.addProduct);
router.get("/:id", ProductController.getProductById);
router.patch("/edit/:id",uploadFile.array("images", 10),stringToArray("tags", "colors"),ProductController.editProduct);
router.delete("/remove/:id", ProductController.removeProduct);


module.exports = {
  AdminApiProductRoutes: router,
};
