const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const createError = require("http-errors");
const { UserModel } = require("../../models/users");

function verifyAccessToken(req, res, next) {
  const headers = req.headers;
  console.log(headers);
  const [bearer, token] = headers?.accesstoken?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) {
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        return next(createError.Unauthorized(" please login to your account "));
      const { phone } = payload || {};
      const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
      if (!user) next(createError("USer not found!"));
      req.user = user;
      return next();
    });
  } else
    return next(createError.Unauthorized(" please login to your account "));
}

module.exports = {
  verifyAccessToken,
};
