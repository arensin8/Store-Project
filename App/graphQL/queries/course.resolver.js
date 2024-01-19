const { GraphQLList, GraphQLString } = require("graphql");
const { CourseType } = require("../typeDefs/course.type");
const { CoursesModel } = require("../../models/course");

const CourseResolver = {
  type: new GraphQLList(CourseType),
  resolve: async () => {
    return await CoursesModel.find({}).populate([{ path : 'teacher'} ,{path : "category"}]);
  },
};



module.exports = {
  CourseResolver,
};
