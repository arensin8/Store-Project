const { default: mongoose, mongo } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId : {type : mongoose.Types.ObjectId , ref : 'product'},
  count : {type : Number , default : 1}
})

const CourseSchema = new mongoose.Schema({
  courseId : {type : mongoose.Types.ObjectId , ref : 'course'},
  count : {type : Number , default : 1}
})

const BasketSchema = new mongoose.Schema({
  courses : {type : [CourseSchema] , default : []},
  products : {type : [ProductSchema] , default : []}
})

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    phone: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    role: { type: String, default: "USER" },
    courses: { type: [mongoose.Types.ObjectId], ref: "course", default: [] },
    products: { type: [mongoose.Types.ObjectId], ref: "product", default: [] },
    basket : {type : BasketSchema}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  }
);

UserSchema.index({
  first_name: "text",
  last_name: "text",
  phone: "text",
  email: "text",
  username: "text",
});

module.exports = {
  UserModel: mongoose.model("user", UserSchema),
};
