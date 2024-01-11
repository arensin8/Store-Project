const { default: mongoose } = require("mongoose");

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
    roles: { type: [String], default: ["USER"] },
    courses: { type: [mongoose.Types.ObjectId], ref: "course", default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
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
