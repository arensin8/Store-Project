const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const fs = require('fs')
const path = require('path')
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans");
const redisClient = require("./init_redis");

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
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
      if (err) reject(createError.InternalServerError("Internal server error"));
      await redisClient.SETEX(String(userId), 365 * 24 * 60 * 60, token);
      resolve(token);
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
      const refreshToken = await redisClient.get(String(user?._id));
      if (token === refreshToken) return resolve(phone);
      reject(createError.Unauthorized("login unsuccessful ,please try again"));
    });
  });
}

function deleteFileInPublic( fileAddress){
  const pathFile = path.join(__dirname, "..", ".." , "public" , fileAddress)
  fs.unlinkSync(pathFile)
}

module.exports = {
  randomNumberGen,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic
};
