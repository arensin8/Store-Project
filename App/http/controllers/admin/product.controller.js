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
const { StatusCodes: httpStatus } = require("http-status-codes");

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
        type,
      } = productBody;
      let features = {};
      features.colors = colors;
      if (
        !isNaN(+width) ||
        !isNaN(+height) ||
        !isNaN(+length) ||
        !isNaN(+weight)
      ) {
        if (!width) features.width = 0;
        else features.width = +width;
        if (!height) features.height = 0;
        else features.height = +height;
        if (!weight) features.weight = 0;
        else features.weight = +weight;
        if (!length) features.length = 0;
        else features.length = +length;
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
        features,
        type,
      });
      return res.status(httpStatus.CREATED).json({
        data: {
          statusCode: httpStatus.CREATED,
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
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const removeResult = await ProductModel.deleteOne({ _id: product._id });
      if (removeResult.deletedCount == 0)
        throw new createHttpError.InternalServerError("Deleting failed");
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const searchText = req?.query?.search || "";
      let products;
      if (searchText) {
        products = await ProductModel.find({
          $text: {
            $search: searchText,
          },
        });
      } else {
        products = await ProductModel.find({});
      }
      return res.json({
        data: {
          statusCode: httpStatus.OK,
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
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
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
