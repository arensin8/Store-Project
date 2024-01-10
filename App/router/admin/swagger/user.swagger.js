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