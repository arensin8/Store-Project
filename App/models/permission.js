const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  {
    toJSON: { virtuals: true },
    versionKey : false
  }
);

module.exports = {
  PermissionsModel: mongoose.model("permissions", PermissionSchema),
};
