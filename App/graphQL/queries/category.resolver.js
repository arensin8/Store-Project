const { GraphQLList, GraphQLString } = require("graphql");
const { CategoriesModel } = require("../../models/categories");
const { CategoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
  type: new GraphQLList(CategoryType),
  resolve: async () => {
    return await CategoriesModel.find({ parent: { $exists: false } });
  },
};

const CategoryChildResolver = {
  type: new GraphQLList(CategoryType),
  args: {
    parent: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { parent } = args;
    return await CategoriesModel.find({ parent });
  },
};

module.exports = {
  CategoryResolver,
  CategoryChildResolver,
};
