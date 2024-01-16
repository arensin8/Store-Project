const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { AuthorType, PublicCategoryType } = require("./public.types");


const FeaturesType = new GraphQLObjectType({
  name: "features",
  fields: {
      length : {type: GraphQLString},
      height : {type: GraphQLString},
      width : {type: GraphQLString},
      weight : {type: GraphQLString},
      colors : {type: new GraphQLList(GraphQLString)},
      madein : {type: GraphQLString}
  }
})
const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: {type : GraphQLString},
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    images: { type: GraphQLString },
    imagesURL: { type:new GraphQLList(GraphQLString) },
    type: { type: GraphQLString },
    supplier: { type: AuthorType },
    price: { type: GraphQLInt },
    count: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    price: { type: GraphQLInt },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: PublicCategoryType },
    features : {type : FeaturesType}
  },
});

module.exports = {
  ProductType,
};

