const { default: mongoose } = require("mongoose");

const CommentsAnswerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);
const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, default: false, required: true },
    openToComment: { type: Boolean, default: true },
    answers: { type: [CommentsAnswerSchema], default : [] },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

module.exports = {
  CommentSchema,
};
