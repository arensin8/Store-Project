
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
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
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
 *          parameters:
 *              -    name : accesstoken
 *                   in : header
 *                   example : Bearer token...
 *                   value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                   required : true
 *                   type : string
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
 *          parameters:
 *              -    name : accesstoken
 *                   in : header
 *                   example : Bearer token...
 *                   value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                   required : true
 *                   type : string
 *          responses :
 *              200:
 *                  description: success
 */