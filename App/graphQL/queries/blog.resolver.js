const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogsModel } = require("../../models/blogs");
const { verifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async (_,args,context) => {
    const {req,res} = context
    verifyAccessTokenInGraphQL(req,res);
    return await BlogsModel.find({}).populate([
      { path: "author" },
      { path: "category" },
    ]);
  },
};

module.exports = {
  BlogResolver,
};
