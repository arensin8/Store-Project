const Controller = require("../controller");

class ProductController extends Controller {
  addProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  editProduct(req, res, next) {
        try {
        } catch (error) {
          next(error);
        }
      }
      removeProduct(req, res, next) {
        try {
        } catch (error) {
          next(error);
        }
      }
      getAllProducts(req, res, next) {
        try {
        } catch (error) {
          next(error);
        }
      }
      getProductById(req, res, next) {
        try {
        } catch (error) {
          next(error);
        }
      }
}

module.exports = {
        ProductController : new ProductController()
}