const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogsModel } = require("../../models/blogs");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  args : {
    category : {type : GraphQLString}
  },
  resolve: async (_,args,) => {
    const {category} = args;
    const findQuery = category ? {category} : {};
    return await BlogsModel.find(findQuery).populate([
      { path: "author" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
    ]);
  },
};

module.exports = {
  BlogResolver,
};
