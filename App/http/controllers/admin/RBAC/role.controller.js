const { StatusCodes: HttpStatus } = require("http-status-codes");
const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.shema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({});
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: {
          roles,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async addRole(req, res, next) {
    try {
      const { title, permissions } = await addRoleSchema.validateAsync(
        req.body
      );
      req.body.title = req.body.title.toUpperCase();
      await this.getRoleBtTitle(title);
      const role = await RoleModel.create({ title : req.body.title, permissions });
      if (!role)
        throw new createHttpError.InternalServerError("Role creating failed");
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: {
          message: "Role created successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeRoleByIdOrTitle(req,res,next){
    try {
        const {field} = req.params;
        const role = await this.findRoleByIdOrTitle(field)
        console.log(role);
        const removeRoleResult = await RoleModel.deleteOne({_id : role._id})
        if(!removeRoleResult.deletedCount) throw new createHttpError.InternalServerError('Role deleting failed')
        return res.status(HttpStatus.OK).json({
            statusCode : HttpStatus.OK,
            data : {
                message : 'Role deleted successfully'
            }
        })
    } catch (error) {
        next(error)
    }
}
  //helper func
  async getRoleBtTitle(title) {
    const role = await RoleModel.findOne({ title });
    if (role) throw new createHttpError.BadRequest("Role already exists!");
  }
  //helper func
  async findRoleByIdOrTitle(field) {
    let findQuery = mongoose.isValidObjectId(field)? {_id: field} : {title: field}
    const role = await RoleModel.findOne(findQuery);
    if (!role) throw new createHttpError.NotFound("Role not found!");
    return role
  }
}

module.exports = {
  RoleController: new RoleController(),
};
