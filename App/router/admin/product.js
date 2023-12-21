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
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

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
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual or physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
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
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual or physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
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

router.post("/add",uploadFile.array("images", 10),stringToArray("tags", "colors"),ProductController.addProduct);

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
 *                -    in : query
 *                     name : search
 *                     type : string
 *                     description : text for the search bt title,text,short_text in products
 *          responses:
 *              201:
 *                  description: Received Product
 */
router.get("/all", ProductController.getAllProducts);

/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get product by id
 *          parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMjA0Nzg3MCwiZXhwIjoxNzAyMTM0MjcwfQ.b_5ygyBQkhJuDm2icmSbJmmTxnm-FoOt1WqTaZ0S0Q8
 *                     required : true
 *                     type : string
 *                -    name : id
 *                     in : path
 *                     required : true
 *                     type : string
 *          responses:
 *              201:
 *                  description: Received Product
 */
router.get("/:id", ProductController.getProductById);

/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: Remove product by id
 *          parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMjA0Nzg3MCwiZXhwIjoxNzAyMTM0MjcwfQ.b_5ygyBQkhJuDm2icmSbJmmTxnm-FoOt1WqTaZ0S0Q8
 *                     required : true
 *                     type : string
 *                -    name : id
 *                     in : path
 *                     required : true
 *                     type : string
 *          responses:
 *              201:
 *                  description: Received Product
 */
router.delete("/remove/:id", ProductController.removeProduct);

/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: Update product
 *          parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTUwNjA5MywiZXhwIjoxNzAxNTkyNDkzfQ.jwU6NAhtDo_1XbssVvKlx-yGwon9DP07Co55Qh9HDO0
 *                     required : true
 *                     type : string
 *                -    name : id
 *                     in : path
 *                     required : true
 *                     type : string
 *                     description : id pf the product for editing
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              200:
 *                  description: update Product
 */

router.patch("/edit/:id",uploadFile.array("images", 10),stringToArray("tags", "colors"),ProductController.editProduct);

// router.delete();
// router.patch();

module.exports = {
  AdminApiProductRoutes: router,
};
