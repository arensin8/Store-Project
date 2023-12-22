const { CourseController } = require('../../http/controllers/admin/course.controller')

const router = require('express').Router()

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