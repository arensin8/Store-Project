const { GraphQLList, GraphQLString } = require("graphql");
const { CommentModel } = require("../../models/comment");
const { CommentType } = require("../typeDefs/comment.type");
const { BlogsModel } = require("../../models/blogs");
const createHttpError = require("http-errors");
const {
  verifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");

const CreateCommentForBlog = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    parent: { type: GraphQLString },
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { comment, blogId, parent } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkBlogExists(blogId);
    await BlogsModel.updateOne(
      { _id :blogId },
      {
        $push: {
          comments: {
            user: user._id,
            comment,
            show: false,
            openToComment: !parent,
          },
        },
      }
    );
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message: "Comment will be added to site after reviewing by admin ",
      },
    };
  },
};

async function checkBlogExists(id) {
  const blog = await BlogsModel.findById(id);
  if (!blog) throw new createHttpError.NotFound("Blog not found");
  return blog;
}

module.exports = {
  CreateCommentForBlog,
};
