const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic, returnListOfImagesFromRequest } = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = returnListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
      const productBody = await createProductSchema.validateAsync(req.body);
      const supplier = req?.user._id;
      const {
        title,
        text,
        short_text,
        category,
        tags,
        price,
        count,
        discount,
        weight,
        height,
        width,
        length,
      } = productBody;

      let feature = {};
      let type = "physical";
      if (width || height || weight || length) {
        if (!width) feature.width = 0;
        else feature.width = width;
        if (!height) feature.height = 0;
        else feature.height = height;
        if (!weight) feature.weight = 0;
        else feature.weight = weight;
        if (!length) feature.length = 0;
        else feature.length = length;
      } else {
        type = "virtual";
      }
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        price,
        count,
        discount,
        images,
        supplier,
        feature,
        type,
      });
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "Product created successfully",
        },
      });
    } catch (error) {
      next(error);
      deleteFileInPublic(req.body.image);
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
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.find({});
      return res.json({
        data: {
          statusCode: 200,
          products,
        },
      });
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
  ProductController: new ProductController(),
};
