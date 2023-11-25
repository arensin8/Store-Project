const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: Users phone for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   phone
 *                  -   code
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: Users mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: received code from getOTP 
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */


/**
 * @swagger
 *      tags :
 *          name : User-authentication
 *          description : user-auth section
 */

/**
 * @swagger
 *  /user/get-otp:
 *      post :
 *            tags : [User-authentication]
 *            summary : Login user into user panel via mobile number
 *            description : One time password (OTP)
 *            requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *            responses:
 *                  201:
 *                      description : Success
 *                  400:
 *                      description : Bad request
 *                  401 :
 *                      description : Unauthorized
 *                  500 :
 *                       description : Internal server error
 */
router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post :
 *            tags : [User-authentication]
 *            summary : check-otp value in user controller
 *            description : check-otp via code-phone and expire date
 *            requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *            responses:
 *                  201:
 *                      description : Success
 *                  400:
 *                      description : Bad request
 *                  401 :
 *                      description : Unauthorized
 *                  500 :
 *                       description : Internal server error
 */
router.post("/check-otp", UserAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *      post :
 *            tags : [User-authentication]
 *            summary : send refresh token for get new token and refresh it
 *            description : fresh token
 *            requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *            responses:
 *                  200:
 *                      description : Success
 *
 */
router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
  UserAuthRoutes: router,
};
