const createError = require("http-errors");
const {
  getOptSchema,
  checkOptSchema,
} = require("../../../validators/user/auth.schema");
const {
  randomNumberGen,
  signAccessToken,
  SignAccessToken,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOptSchema.validateAsync(req.body);
      const code = randomNumberGen();
      const { phone } = req.body;
      const result = this.saveUser(phone, code);
      if (!result)
        throw createError.Unauthorized("login unsuccessful, please try again");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "The code has been sent to you",
          code,
          phone,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOtp(req, res, next) {
    try {
      await checkOptSchema.validateAsync(req.body);
      const { phone, code } = req.body;
      const user = await UserModel.findOne({ phone });
      if (!user) throw createError.NotFound("User not found");
      if (user.otp.code != code)
        throw createError.Unauthorized("Your entered code is incorrect");
      const now = new Date().getTime();
      if (+user.otp.expiresIn < now)
        throw createError.Unauthorized("your code is expired");
      const accessToken = await SignAccessToken(user._id);

      return res.status(200).json({
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(phone, code) {
    const now = new Date().getTime();
    let otp = {
      code,
      expiresIn: now + 120000,
    };
    const user = await this.checkExistUser(phone);
    if (user) {
      //   console.log(user.otp, now);
      //   if (+user.otp.expiresIn > now) throw createError.Forbidden("کد اعتبار سنجی قبلی هنوز منقضی نشده است")
      return await this.updateUser(phone, { otp });
    }
    return await UserModel.create({
      phone,
      otp,
      Role: ["USER"],
    });
  }
  async checkExistUser(phone) {
    const user = await UserModel.findOne({ phone });
    return user;
  }
  async updateUser(phone, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { phone },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
