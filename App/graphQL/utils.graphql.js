
const { Kind } = require("graphql");
const { BlogsModel } = require("../models/blogs");
const createHttpError = require("http-errors");
const { CoursesModel } = require("../models/course");
const { ProductModel } = require("../models/products");

function parseObject(valueNode){
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    });
    return value
}

function parseValueNode(valueNode){
    switch(valueNode.kind){
        case Kind.BOOLEAN:
        case Kind.STRING:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(value => parseValueNode(value))
        default:
            return null
    }
}

function parseLiteral(valueNode){
    switch(valueNode.kind){
        case Kind.STRING:
          return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
          return Number(valueNode.value)
        case Kind.OBJECT:

      }
}

function toObject(value){
    if (typeof value === "object") {
        return value;
      }
      if (typeof value === "string" && value.charAt(0) === "{") {
        return JSON.parse(value);
      }
      return null;
}

async function checkExistsBlog(id) {
    const blog = await BlogsModel.findById(id);
    if (!blog) throw new createHttpError.NotFound("Blog not found");
    return blog;
  }
  async function checkExistsCourse(id) {
    const course = await CoursesModel.findById(id);
    if (!course) throw new createHttpError.NotFound("course not found");
    return course;
  }
  async function checkExistsProduct(id) {
    const product = await ProductModel.findById(id);
    if (!product) throw new createHttpError.NotFound("product not found");
    return product;
  }

module.exports = {
    parseLiteral,
    parseObject,
    toObject,
    parseValueNode,
    checkExistsBlog,
    checkExistsCourse,
    checkExistsProduct
}