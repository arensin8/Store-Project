const productController = require("../../http/controllers/admin/product.controller");
const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images :
 *                        type : array
 *                        items : 
 *                              type : string
 *                              format : binary
 *                  height:
 *                       type: string
 *                       description: the height of the product package
 *                       example: 0
 *                  width:
 *                       type: string
 *                       description: the width of the  product package
 *                       example: 0
 *                  weight:
 *                       type: string
 *                       description: the weight of the product package
 *                       example: 0
 *                  length:
 *                       type: string
 *                       description: the length of the product package
 *                       example: 0
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTUwNjA5MywiZXhwIjoxNzAxNTkyNDkzfQ.jwU6NAhtDo_1XbssVvKlx-yGwon9DP07Co55Qh9HDO0
 *                     required : true
 *                     type : string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new Product
 */

router.post("/add",uploadFile.array("images" , 10),stringToArray("tags"),ProductController.addProduct);

/**
 * @swagger
 *  /admin/products/all:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get all product
 *          parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTUwNjA5MywiZXhwIjoxNzAxNTkyNDkzfQ.jwU6NAhtDo_1XbssVvKlx-yGwon9DP07Co55Qh9HDO0
 *                     required : true
 *                     type : string
 *          responses:
 *              201:
 *                  description: Received Product
 */
router.get("/all", ProductController.getAllProducts);
// router.patch();
// router.delete();
// router.get();

module.exports = {
  AdminApiProductRoutes: router,
};
