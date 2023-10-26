const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
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
 *            parameters :
 *            -   name : phone
 *                description : am-AM phone number
 *                in : formData
 *                required : true
 *                type : string
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
router.post("/check-otp", UserAuthController.checkOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post :
 *            tags : [User-authentication]
 *            summary : check-otp value in user controller
 *            description : check-otp via code-phone and expire date
 *            parameters :
 *            -   name : phone
 *                description : am-AM phone number
 *                in : formData
 *                required : true
 *                type : string
 *            -   name : code
 *                description : your sms code
 *                in : formData
 *                type : string
 *                required : true
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
module.exports = {
  UserAuthRoutes: router,
};
