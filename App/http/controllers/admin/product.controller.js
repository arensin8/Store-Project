const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/products");
const {
  deleteFileInPublic,
  returnListOfImagesFromRequest,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { objectIdValidator } = require("../../validators/public.validator");
const Controller = require("../controller");
const path = require("path");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = returnListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
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
        colors,
      } = productBody;

      let feature = {};
      feature.colors = colors;
      let type = "physical";
      if (!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)) {
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
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      res.status(200).json({
        statusCode: 200,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async findProductById(productID) {
    const { id } = await objectIdValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("Product not found!");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
