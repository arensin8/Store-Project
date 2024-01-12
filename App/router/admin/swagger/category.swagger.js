//category
/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the title of category
 */


//add
/**
 * @swagger
 *  /admin/category/add:
 *      post :
 *            tags : [Admin-Panel]
 *            summary : create new category title
 *            requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *            responses:
 *                  201:
 *                      description : Success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
*/

//get all parents
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *            tags : [Admin-Panel]
 *            summary : Get all parents of categories
 *            responses:
 *                  200:
 *                      description : Success
*/

//get all children of parents
/**
 * @swagger
 *  /admin/category/children/{parent} :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all children of parent
 *            parameters:
 *                -    in : path
 *                     type : string
 *                     name: parent
 *                     required: true
 *            responses:
 *                  200:
 *                      description : Success
*/

//get all
/**
 * @swagger
 *  /admin/category/all :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all categories
 *            responses:
 *                  200:
 *                      description : Success
*/

//delete
/**
 * @swagger
 *  /admin/category/remove/{id} :
 *      delete :
 *            tags : [Admin-Panel]
 *            summary : remove category by object-id
 *            parameters:
 *                -    in : path
 *                     type : string
 *                     name: id
 *                     required: true
 *            responses:
 *                  200:
 *                      description : Success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
*/

//get all without populate
/**
 * @swagger
 *  /admin/category/list-of-all :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all categories without populate and nested structure
 *            responses:
 *                  200:
 *                      description : Success
*/

//get by id
/**
 * @swagger
 *  /admin/category/{id} :
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get category by objet-id
 *            parameters:

 *                -    in : path
 *                     type : string
 *                     name: id
 *                     required: true
 *            responses:
 *                  200:
 *                      description : Success
*/

//update
/**
 * @swagger
 *  /admin/category/update/{id} :
 *    patch :
 *      tags : [Admin-Panel]
 *      summary : Edit or update category with object id
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required : true
 *      requestBody:
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        200:
 *          description: success
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/publicDefinition'
 *        500:
 *          description: internalServerError
*/