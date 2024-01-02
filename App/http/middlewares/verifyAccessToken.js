const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");
const createError = require("http-errors");
const { UserModel } = require("../../models/users");

// function getToken(headers) {
//   const [bearer, token] = headers?.accesstoken?.split(" ") || [];
//   if (token && ["Bearer", "bearer"].includes(bearer)) return token;
//   throw createError.Unauthorized("Login unsuccessful, try again!");
// }
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

function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      if (user.roles.includes(role)) return next();
      throw createError.Forbidden(`You don't have access to this section`);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  verifyAccessToken,
  checkRole,
};
