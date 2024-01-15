//color
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

//product
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
 *                      description: the short text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                      example: 659cfaecbf60af1ecd132b89
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the count of product
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

//Edit-product
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
 *                      description: the short text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the count of product
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

//add
/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

//get all
/**
 * @swagger
 *  /admin/products/all:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get all product
 *          parameters:
 *                -    in : query
 *                     name : search
 *                     type : string
 *                     description : text for the search bt title,text,short_text in products
 *          responses:
 *              201:
 *                  description: Received Product
*/

//get by id
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: Get product by id
 *          parameters:
 *                -    name : id
 *                     in : path
 *                     required : true
 *                     type : string
 *          responses:
 *              201:
 *                  description: Received Product
*/

//delete
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: Remove product by id
 *          parameters:
 *                -    name : id
 *                     in : path
 *                     required : true
 *                     type : string
 *          responses:
 *              201:
 *                  description: Received Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

//update
/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: Update product
 *          parameters:
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */