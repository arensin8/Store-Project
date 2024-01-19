const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { AuthorType, PublicCategoryType } = require("./public.types");


const EpisodeType = new GraphQLObjectType({
  name: "EpisodeType",
  fields: {
    _id: {type : GraphQLString},
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    time: { type: GraphQLString },
    videoPath: { type: GraphQLString },
    videoURL: { type: GraphQLString },
    type: { type:new GraphQLList(GraphQLString) }
  },
});
const ChapterType = new GraphQLObjectType({
  name: "ChapterType",
  fields: {
    _id: {type : GraphQLString},
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    episodes : {type :new GraphQLList(EpisodeType)}
  },
});
const CourseType = new GraphQLObjectType({
  name: "CourseType",
  fields: {
    _id: {type : GraphQLString},
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    short_text: { type: GraphQLString },
    image: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    type: { type: GraphQLString },
    price: { type: GraphQLInt },
    count: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    category: { type: PublicCategoryType },
    teacher: { type: AuthorType },
    status : {type : GraphQLString},
    chapters : {type :new GraphQLList(ChapterType)}
  },
});

module.exports = {
  CourseType,
};
