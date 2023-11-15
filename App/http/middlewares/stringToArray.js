const stringToArray = function (field) {
  return function (req, res, next) {
    if (req.body[field]) {
      if (typeof req.body[field] === "string") {
        if (req.body[field].indexOf("#") >= 0) {
          req.body[field] = req.body[field]
            .split("#")
            .map((item) => item.trim());
        }
      } else if (req.body[field].constructor.indexOf("Array") >= 0) { //check if the input is array ? 
        req.body[field] = req.body[field].map((item) => item.trim());
      }
    } else {
      req.body[field] = [];
    }
    next()
  };
};

module.exports = {
        stringToArray
}