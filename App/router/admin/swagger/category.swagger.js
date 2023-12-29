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
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                required : true
 *                type : string
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
 *      get :
 *            tags : [Admin-Panel]
 *            summary : Get all parents of categories
 *            parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *            parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *            parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *        - name : accesstoken
 *          in : header
 *          example : Bearer token...
 *          value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *          required : true
 *          type : string
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