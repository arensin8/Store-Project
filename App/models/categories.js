const { schema } = require("@hapi/joi/lib/compile");
const { default: mongoose } = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      default: undefined,
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
      versionKey : false
    },
  }
);
CategoriesSchema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});
function autoPopulate(next) {
  this.populate([{ path: "children"  , select : {__v : 0 , id:0}}]);
  next();
}
CategoriesSchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

module.exports = {
  CategoriesModel: mongoose.model("category", CategoriesSchema),
};
