const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/products");
const {
  deleteFileInPublic,
  returnListOfImagesFromRequest,
  setFeatures,
  copyObject,
  deleteInvalidPropertiesInObject,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { objectIdValidator } = require("../../validators/public.validator");
const Controller = require("../controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");

const ProductBlackList = {
  BOOKMARKS:"bookmarks",
  LIKES:"likes",
  DISLIKES:"dislikes",
  SUPPLIER:"supplier",
  COMMENTS:"comments",
  WEIGHT:"weight",
  HEIGHT:"height",
  WIDTH:"width",
  LENGTH:"length",
  COLORS:"colors",
}
Object.freeze(ProductBlackList)

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
        type,
      } = productBody;

      let features = setFeatures(req.body);
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
  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const data = copyObject(req.body);
      data.images = returnListOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      data.features = setFeatures(req.body);
      let blackListFields = Object.values(ProductBlackList)
      deleteInvalidPropertiesInObject(data , blackListFields)
      const updateProductResult = await ProductModel.updateOne(
        { _id: product._id },
        { $set: data }
      );
      if (updateProductResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("Internal server error");
      return res.status(httpStatus.OK).json({
        data : {
          status : httpStatus.OK,
          message : 'product updated successfully'
        }
      });
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
