const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const BlogSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, required: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
  },
  {
    toJSON : {virtuals : true},
    timestamps: true,
    versionKey: false,
  }
);

BlogSchema.virtual("imageURL").get(function(){
  const url = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
  console.log("Generated Image URL:", url);
  return url;
})

BlogSchema.virtual("user", {
  ref: "user",
  localField: "_id",
  foreignField: "author",
});

BlogSchema.virtual("category-details", {
  ref: "category",
  localField: "_id",
  foreignField: "category",
});



module.exports = {
  BlogsModel: mongoose.model("blog", BlogSchema),
};
