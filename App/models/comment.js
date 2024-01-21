const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, default: false, required: true },
    openToComment: { type: Boolean, default: true },
    parent: { type: mongoose.Types.ObjectId, ref: "comment" },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

module.exports = {
  CommentModel: mongoose.model("comment", Schema),
};
