//swagger for adding and updating blogs
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Blog
 *                  short_text:
 *                      type: string
 *                      description: the summary of the text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of the tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreignField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreignField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 


//get all
/**
 * @swagger
 *  /admin/blogs:
 *      get :
 *            tags : [Blogs(AdminPanel)]
 *            summary : get all blogs
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
 *            responses:
 *                  200:
 *                      description : Success
 */

//add
/**
 * @swagger
 *  /admin/blogs/add:
 *      post :
 *            tags : [Blogs(AdminPanel)]
 *            summary : create a new blog
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMTA3MDgyNiwiZXhwIjoxNzAxMTU3MjI2fQ.NupZT9x7ec8yTyM6HYzzf6_uBvPNQ-DIo-xWLuW45_g
 *                required : true
 *                type : string
 *            requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *            responses:
 *                  201:
 *                      description : Created
*/

//get by id
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get :
 *            tags : [Blogs(AdminPanel)]
 *            summary : get blog by id and populate fields
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
 *            -   name : id
 *                in : path
 *                required : true
 *                type : string
 *            responses:
 *                  200:
 *                      description : Success
*/

//delete
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete :
 *            tags : [Blogs(AdminPanel)]
 *            summary : delete blog by id and populate fields
 *            parameters :
 *            -   name : accesstoken
 *                in : header
 *                example : Bearer token...
 *                value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE2NzI0NSIsImlhdCI6MTcwMDQyMDQ1NywiZXhwIjoxNzAwNTA2ODU3fQ.REc4UQgejTChMUosHuWNB7xZGWdeow1ZJ4pXgw4SulA
 *                required : true
 *                type : string
 *            -   name : id
 *                in : path
 *                required : true
 *                type : string
 *            responses:
 *                  200:
 *                      description : Success
*/

//update
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch :
 *            tags : [Blogs(AdminPanel)]
 *            summary : update blog by id
 *            consumes: 
 *              -   multipart/form-data
 *            parameters :
 *               -   name : accesstoken
 *                   in : header
 *                   example : Bearer token...
 *                   value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5NTE4NTg5OCIsImlhdCI6MTcwMDU2MzEyNCwiZXhwIjoxNzAwNjQ5NTI0fQ.Dx5DIlYS8fdWuLFpnTJ6KZTXg2waJbbetWh6Mtt4_5c
 *                   required : true
 *                   type : string
 *               -   name : id
 *                   in : path
 *                   type : string
 *                   required : true
 *            requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *            responses:
 *                  201:
 *                      description : Created
*/