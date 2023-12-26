const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Episodes = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "unlock" },
  time: { type: String, required: true },
});

const Chapter = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [Episodes], default: [] },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, default: "free" /*free,cash,premium*/, required: true },
  time: { type: String, default: "00:00:00" },
  status: { type: String, default: "notStarted" /*notStarted,completed,ongoing */ },
  teacher: { type: String, ref: "user", required: true },
  chapters: { type: [Chapter], default: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});

CourseSchema.index({ title: "text", short_text: "text", text: "text" });

module.exports = {
  CoursesModel: mongoose.model("course", CourseSchema),
};
