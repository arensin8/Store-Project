const { StatusCodes : HttpStatus } = require("http-status-codes");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");

class UserController extends Controller{
    async getAllUsers(req,res,next){
        try {
            const users = await UserModel.find({})
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK ,
                data : {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController : new UserController()
}