const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogsModel } = require("../../models/blogs");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async (_,args,context) => {
    // const {req,} = context
    // req.user = await verifyAccessTokenInGraphQL(req);
    // console.log(req.user);
    return await BlogsModel.find({}).populate([
      { path: "author" },
      { path: "category" },
    ]);
  },
};

module.exports = {
  BlogResolver,
};
