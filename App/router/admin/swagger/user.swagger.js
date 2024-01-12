
//update schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                      example: Aren
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: Sinaei
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: arensinan7@gmail.com
 *                  username:
 *                      type: string
 *                      example: arensin
 *                      description: the username of user
 */

//definition
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09332255768"
 */

//get all
/**
 * @swagger
 *  /admin/users/all :
 *      get :
 *            tags : [Users(AdminPanel)]
 *            summary : Get all users
 *            parameters:
 *                -    in : query
 *                     name : search
 *                     type : string
 *                     description : search by first-last name,username , email and phone
 *            responses:
 *                  200:
 *                      description : Success
 */

//update profile
/**
 * @swagger
 *  /admin/users/update-profile:
 *      patch:
 *          tags: [Users(AdminPanel)]
 *          summary: update user details and profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */

//get user profile
/**
 * @swagger
 *  /admin/users/profile:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get user profile
 *          responses :
 *              200:
 *                  description: success
 */