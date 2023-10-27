const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans");

function randomNumberGen() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      expiresIn: "1d",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("Internal server error"));
      resolve(token, console.log(token));
    });
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      expiresIn: "1d",
    };
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("Internal server error"));
      resolve(token, console.log(token));
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        reject(createError.Unauthorized(" please login to your account "));
      const { phone } = payload || {};
      const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
      if (!user) reject(createError("USer not found!"));
      resolve(phone);
    });
  });
}

module.exports = {
  randomNumberGen,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
};
