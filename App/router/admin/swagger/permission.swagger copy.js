
//definitions
/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of permission"
 *                                          
 */

//Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the describe of permission
 */

//edit Schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the desc of permission
 */

//get all
/**
 * @swagger
 *  /admin/permissions/all:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get all Permissions    
 *          responses:
 *              200:
 *                  description: get all permissions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfPermissions'
 * 
 */

//add
/**
 * @swagger
 *  /admin/permissions/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: create new Permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
 *          
 *          responses:
 *              201:
 *                  description: created new Permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */

//update
/**
 * @swagger
 *  /admin/permissions/update/{id}:
 *      patch:
 *          tags: [RBAC(AdminPanel)]
 *          summary: edit the Permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
 *          responses:
 *              200:
 *                  description: edit the Permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */

//remove
/**
 * @swagger
 *  /admin/permissions/remove/{id}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: remove the Permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true        
 *          responses:
 *              200:
 *                  description: removed the Permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */