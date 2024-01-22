const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");

const ParentType = new GraphQLObjectType({
  name: "ParentType",
  fields: {
    _id: { type: GraphQLString },
    user: { type: UserType },
    comment: { type: GraphQLString },
    show : { type: GraphQLBoolean },
    openToComment : { type: GraphQLBoolean },
    createdAt : { type: GraphQLString }
  },
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: {
    user: { type: UserType },
    comment: { type: GraphQLString },
    parent: { type: ParentType },
    show : { type: GraphQLBoolean },
    openToComment : { type: GraphQLBoolean },
    createdAt : { type: GraphQLString }
  },
});

module.exports = {
  CommentType,
};
