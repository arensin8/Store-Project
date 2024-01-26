const { GraphQLList, GraphQLString } = require("graphql");
const { CourseType } = require("../typeDefs/course.type");
const { CoursesModel } = require("../../models/course");

const CourseResolver = {
  type: new GraphQLList(CourseType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { category } = args;
    const findQuery = category ? { category } : {};
    return await CoursesModel.find(findQuery).populate([
      { path: "teacher" },
      { path: "category" },
      { path: "comments.user" },
      { path: "comments.answers.user" },
      { path: "likes" },
      { path: "dislikes" },
      { path: "bookmarks" },
    ]);
  },
};

module.exports = {
  CourseResolver,
};
