const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");
function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}
const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimeTypes = [".webp", ".jpg", ".jpeg", ".png", ".gif"];
  if (mimeTypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createHttpError.BadRequest("File format is invalid"));
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.filename = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});
const maxSize = 1 * 1000 * 1000; //1Mb
const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});

module.exports = {
  uploadFile,
};
