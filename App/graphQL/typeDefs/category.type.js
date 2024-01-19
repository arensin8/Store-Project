const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const {  AnyType } = require("./public.types");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    children : {type : GraphQLList(AnyType)}
  },
});

module.exports = {
  CategoryType,
};
