const { CourseController } = require('../../http/controllers/admin/course.controller')
const { stringToArray } = require('../../http/middlewares/stringToArray')
const { uploadFile } = require('../../utils/multer')

const router = require('express').Router()

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
 */

router.post("/add",uploadFile.single("image"),stringToArray("tags"),CourseController.addCourse)
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
 *                     type : text
 *                     description : search in courses by text,short_text or title
 *            responses:
 *                  200:
 *                      description : Success
 */

router.get("/all" , CourseController.getAllCourses)
// router.post()
// router.delete()
// router.put()
// router.put()
// router.patch()
// router.get()

module.exports = {
        AdminApiCourseRouter : router
}