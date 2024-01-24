const { GraphQLList, GraphQLString } = require("graphql");
const { BlogsModel } = require("../../models/blogs");
const createHttpError = require("http-errors");
const {
  verifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { copyObject } = require("../../utils/functions");
const { default: mongoose } = require("mongoose");
const { CoursesModel } = require("../../models/course");
const { ProductModel } = require("../../models/products");
const { objectIdValidator } = require("../../http/validators/public.validator");

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
    if (!mongoose.isValidObjectId(blogId))
      throw new createHttpError.BadRequest("blogId is incorrect");
    await checkExistsBlog(blogId);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(BlogsModel, parent);
      const createAnswerResult = await BlogsModel.updateOne(
        {
          _id: blogId,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw new createHttpError.InternalServerError(
          "The reply to the comment was not registered"
        );
      }
      return {
        statusCode: StatusCodes.CREATED,
        data: {
          message: "The reply to the comment was recorded ",
        },
      };
    } else {
      await BlogsModel.updateOne(
        { _id: blogId },
        {
          $push: {
            comments: {
              user: user._id,
              comment,
              show: false,
              openToComment: true,
            },
          },
        }
      );
    }
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message: "Comment will be added to site after reviewing by admin ",
      },
    };
  },
};

const CreateCommentForProduct = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    parent: { type: GraphQLString },
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { comment, productId, parent } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsProduct(productId);


    if (!mongoose.isValidObjectId(productId)) {
      throw new createHttpError.BadRequest("courseId is incorrect");
    }

    // Check if the parent is a valid ObjectId
    if (parent && !mongoose.isValidObjectId(parent)) {
      throw new createHttpError.BadRequest("Invalid parent comment ID");
    }

    // If a parent is provided, try to add a reply; otherwise, add a new comment
    if (parent) {
      const commentDocument = await getComment(ProductModel, parent);

      if (!commentDocument) {
        throw new createHttpError.BadRequest("Parent comment does not exist");
      }

      const createAnswerResult = await CoursesModel.updateOne(
        {
          _id: productId,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );

      if (!createAnswerResult.modifiedCount) {
        throw new createHttpError.InternalServerError(
          "The reply to the comment was not registered"
        );
      }

      return {
        statusCode: StatusCodes.CREATED,
        data: {
          message: "The reply to the comment was recorded",
        },
      };
    } else {
      await ProductModel.updateOne(
        { _id: productId },
        {
          $push: {
            comments: {
              user: user._id,
              comment,
              show: false,
              openToComment: true,
            },
          },
        }
      );
    }
    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message: "Comment will be added to the site after reviewing by admin",
      },
    };
  },
};

const CreateCommentForCourse = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    parent: { type: GraphQLString },
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const { comment, courseId, parent } = args;
    const user = await verifyAccessTokenInGraphQL(req);
    await checkExistsCourse(courseId);


    if (!mongoose.isValidObjectId(courseId)) {
      throw new createHttpError.BadRequest("courseId is incorrect");
    }

    // Check if the parent is a valid ObjectId
    if (parent && !mongoose.isValidObjectId(parent)) {
      throw new createHttpError.BadRequest("Invalid parent comment ID");
    }

    // If a parent is provided, try to add a reply; otherwise, add a new comment
    if (parent) {
      const commentDocument = await getComment(CoursesModel, parent);

      if (!commentDocument) {
        throw new createHttpError.BadRequest("Parent comment does not exist");
      }

      const createAnswerResult = await CoursesModel.updateOne(
        {
          _id: courseId,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );

      if (!createAnswerResult.modifiedCount) {
        throw new createHttpError.InternalServerError(
          "The reply to the comment was not registered"
        );
      }

      return {
        statusCode: StatusCodes.CREATED,
        data: {
          message: "The reply to the comment was recorded",
        },
      };
    } else {
      await CoursesModel.updateOne(
        { _id: courseId },
        {
          $push: {
            comments: {
              user: user._id,
              comment,
              show: false,
              openToComment: true,
            },
          },
        }
      );
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message: "Comment will be added to the site after reviewing by admin",
      },
    };
  },
};



async function checkExistsBlog(id) {
  const blog = await BlogsModel.findById(id);
  if (!blog) throw new createHttpError.NotFound("Blog not found");
  return blog;
}
async function checkExistsCourse(id) {
  const course = await CoursesModel.findById(id);
  if (!course) throw new createHttpError.NotFound("course not found");
  return course;
}
async function checkExistsProduct(id) {
  const product = await ProductModel.findById(id);
  if (!product) throw new createHttpError.NotFound("product not found");
  return product;
}

//helper function
async function getComment(model, id) {
  const foundComment = await model.findOne(
    { "comments._id": id },
    { "comments.$": 1 }
  );
  const comment = copyObject(foundComment);
  if (!comment) throw new createHttpError.NotFound("Comment not found!");
  return comment?.comments?.[0];
}

module.exports = {
  CreateCommentForBlog,
  CreateCommentForCourse,
  CreateCommentForProduct
};
