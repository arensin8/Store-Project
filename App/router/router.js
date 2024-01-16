const router = require("express").Router();
const { graphqlHTTP } = require("express-graphql");
const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { AdminApiProductRoutes } = require("./admin/product");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");

const { UserAuthRoutes } = require("./user/auth");
const { graphqlConfig } = require("../utils/graphql.config");

router.use("/user", UserAuthRoutes);
router.use("/admin", verifyAccessToken ,  AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/", HomeRoutes);
module.exports = {
  AllRoutes: router,
};
