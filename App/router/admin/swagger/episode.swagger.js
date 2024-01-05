/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title       
 *                  -   text       
 *                  -   video       
 *                  -   type       
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: 6593ceba049770937a76f031
 *                  chapterId: 
 *                      type: string
 *                      example: 6593da10214b07cfbbdeaabe
 *                  title:
 *                      type: string
 *                      description: the title of the episode
 *                  text: 
 *                      type: string
 *                      description: description about this episode
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video:
 *                      type : string
 *                      description : The Video of the episode
 *                      format : binary
 *          EditEpisode:
 *              type: object     
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of the episode
 *                  text: 
 *                      type: string
 *                      description: Description about this episode
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 */

//add episode
/**
 * @swagger
 *  /admin/episodes/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: create and save new episode
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
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                                $ref: '#/definitions/publicDefinition'
 */