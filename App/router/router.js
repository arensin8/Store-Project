const router = require("express").Router();
const redisClient = require("../utils/init_redis");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
(async () => {
  await redisClient.set("key", "value");
  const value = await redisClient.get("key");
  console.log(value);
})();

router.use("/user", UserAuthRoutes);
router.use("/", HomeRoutes);
module.exports = {
  AllRoutes: router,
};
