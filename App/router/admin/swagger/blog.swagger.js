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
 *            requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *            responses:
 *                  201:
 *                      description : Created
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
*/

//get by id
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get :
 *            tags : [Blogs(AdminPanel)]
 *            summary : get blog by id and populate fields
 *            parameters :
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
 *            -   name : id
 *                in : path
 *                required : true
 *                type : string
 *            responses:
 *                  200:
 *                      description : Success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
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
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
*/