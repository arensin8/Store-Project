const { StatusCodes: HttpStatus } = require("http-status-codes");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const {
  deleteInvalidPropertiesInObject,
} = require("../../../../utils/functions");
const createHttpError = require("http-errors");

class UserController extends Controller {
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;
      let users;
      if (search) users = await UserModel.find({ $text: { $search: search } });
      else users = await UserModel.find({});
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfile(req, res, next) {
    try {
      const userId = req.user._id;
      console.log("k", userId);
      const data = req.body;
      const blackListFields = [
        "phone",
        "otp",
        "courses",
        "bills",
        "discount",
        "roles",
      ];
      deleteInvalidPropertiesInObject(data, blackListFields);
      const updateProfileResult = await UserModel.updateOne(
        { _id: userId },
        { $set: data }
      );
      if (updateProfileResult.modifiedCount === 0)
        throw new createHttpError.InternalServerError(
          "Profile updating failed"
        );
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          message: "Profile updated successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async userProfile(req, res, next) {
    try {
      const user = req.user;
      //bill, courses, discount,
    //   console.log(await getBasketOfUser(user._id));
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
