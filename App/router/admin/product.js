const { ProductController } = require("../../http/controllers/admin/product.controller");
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
 *                  image : 
 *                        type : file
 *                        description : djksjs
 *                  height:
 *                       type: string
 *                       description: the height of the product package
 *                       example: 100
 *                  width:
 *                       type: string
 *                       description: the width of the  product package
 *                       example: 100
 *                  weight:
 *                       type: string
 *                       description: the weight of the product package
 *                       example: 100
 *                  length:
 *                       type: string
 *                       description: the length of the product package
 *                       example: 100
 *             
 *                      
 */


/**
 * @swagger
 *   /admin/products/add :
 *      post:
 *           tags: [Product(AdminPanel)]
 *           summary: create and save product
 *           requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *           responses:
 *                201:
 *                    description: Created Product
 */           

router.post('/add' , uploadFile.single("image"), stringToArray('tags'), ProductController.addProduct);
// router.patch();
// router.delete();
// router.get();
// router.get();

module.exports = {
  AdminApiProductRoutes: router,
};
