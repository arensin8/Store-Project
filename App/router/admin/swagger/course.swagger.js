//definitions
/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and description of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | onGoing"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: integer
 *                                      example: 20
 *                                  studentCount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      example: "Aren Sinaei"
 */

//types
/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   cash
 *                  -   free
 *                  -   premium
 */

//course
/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                  short_text:
 *                      type: string
 *                      description: the short text of course
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: 20
 *                  image :
 *                        type : string
 *                        format : binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 */

//add
/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
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
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                                $ref: '#/definitions/publicDefinition'
 */

//get all
/**
 * @swagger
 *  /admin/courses/all :
 *      get :
 *            tags : [Course(AdminPanel)]
 *            summary : Get all courses
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
 *                     description : search in courses by text,short_text or title
 *            responses:
 *                  200:
 *                      description : Success
 */

//get by id
/**
 * @swagger
 *  /admin/courses/{id} :
 *      get :
 *            tags : [Course(AdminPanel)]
 *            summary : Get course by id
 *            parameters:
 *                -    name : accesstoken
 *                     in : header
 *                     example : Bearer token...
 *                     value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                     required : true
 *                     type : string
 *                -    in : path
 *                     name : id
 *                     type : string
 *                     description : search in courses by text,short_text or title
 *            responses:
 *                  200:
 *                      description : Success
 */


