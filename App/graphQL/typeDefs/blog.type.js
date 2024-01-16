const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType,  PublicCategoryType } = require("./public.types");

const BlogType = new GraphQLObjectType({
  name: "BlogType",
  fields: {
    _id: {type : GraphQLString},
    author: {type : AuthorType},
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    image: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: PublicCategoryType },
  },
});

module.exports = {
  BlogType,
};
