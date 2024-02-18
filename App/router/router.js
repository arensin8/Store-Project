const router = require("express").Router();
const { graphqlHTTP } = require("express-graphql");
const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
const { graphqlConfig } = require("../utils/graphql.config");
const { supporSectionRouter } = require("./support/support.router");

router.use("/user", UserAuthRoutes);
router.use("/admin", verifyAccessToken ,  AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/support", supporSectionRouter);
router.use("/", HomeRoutes);


module.exports = {
  AllRoutes: router,
};
