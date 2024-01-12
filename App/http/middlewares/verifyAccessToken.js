const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");
const createError = require("http-errors");
const { UserModel } = require("../../models/users");
const createHttpError = require("http-errors");


function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized(
    "Login unsuccessful, try again!"
  );
}
// function verifyAccessToken(req, res, next) {
//   const headers = req.headers;
//   const [bearer, token] = headers?.accesstoken?.split(" ") || [];
//   if (token && ["Bearer", "bearer"].includes(bearer)) {
//     JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
//       if (err)
//         return next(createError.Unauthorized(" please login to your account "));
//       const { phone } = payload || {};
//       const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
//       if (!user) next(createError("USer not found!"));
//       req.user = user;
//       return next();
//     });
//   } else
//     return next(createError.Unauthorized(" please login to your account "));
// }

function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      try {
        if (err) throw createHttpError.Unauthorized("please login to your account ");
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) throw createHttpError.Unauthorized("User not found!");
        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
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
