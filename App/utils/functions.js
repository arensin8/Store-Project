const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constans");

function randomNumberGen() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function SignAccessToken(userId) {
        return new Promise(async (resolve, reject) => {
            const user = await UserModel.findById(userId)
            const payload = {
                phone: user.phone
            };
            const options = {
                expiresIn: "1d"
            };
            JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
                if (err) reject(createError.InternalServerError("خطای سروری"));
                resolve(token , console.log(token))
            })
        })
    }

module.exports = {
  randomNumberGen,
  SignAccessToken,
};
