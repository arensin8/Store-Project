const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const fs = require("fs");
const path = require("path");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constant");
const { log } = require("console");
// const redisClient = require("./init_redis");

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
      // await redisClient.SETEX(String(userId), 365 * 24 * 60 * 60, token);
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

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    fs.unlinkSync(pathFile);
  }
}

function returnListOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}

function setFeatures(body) {
  const { colors, width, length, height, weight } = body;
  let features = {};
  features.colors = colors;
  if (!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)) {
    if (!width) features.width = 0;
    else features.width = +width;
    if (!height) features.height = 0;
    else features.height = +height;
    if (!weight) features.weight = 0;
    else features.weight = +weight;
    if (!length) features.length = 0;
    else features.length = +length;
  }
  return features
}

function deleteInvalidPropertiesInObject(data = {} , blackListFields = []){
  let nullishData = ["", " ", 0, "0", null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (nullishData.includes(data[key])) delete data[key];
    if (Array.isArray(data[key] && data[key].length > 0))
      data[key] == data[key].map((item) => item.trim());
    if (Array.isArray(data[key] && data[key].length == 0)) delete data[key];
  });
  return data
}

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function getTime(seconds) {
  let total = Math.round(seconds) / 60;
  let [minutes, percent] = String(total).split(".");
  let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
  console.log('second:',second);
  let hour = 0;
  if (minutes > 60) {
      total = minutes / 60
       let [h1, percent] = String(total).split(".");
       hour = h1,
       minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
  }
  if(String(hour).length ==1) hour = `0${hour}`
  if(String(minutes).length ==1) minutes = `0${minutes}`
  if(String(second).length ==1) second = `0${second}`
  
  return (hour + ":" + minutes + ":" +second)
}

module.exports = {
  randomNumberGen,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic,
  returnListOfImagesFromRequest,
  copyObject,
  setFeatures,
  deleteInvalidPropertiesInObject,
  getTime
};
