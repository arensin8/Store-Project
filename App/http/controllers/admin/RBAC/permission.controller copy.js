const { PermissionsModel } = require("../../../../models/permission");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.shema");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes : HttpStatus } = require("http-status-codes");



class PermissionController extends Controller{
    async getAllPermissions(req,res,next){
        try {
            const permissions = await PermissionsModel.find({})
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async addPermission(req,res,next){
        try {
            const {name,description} = await addPermissionSchema.validateAsync(req.body)
            await this.getPermissionByName(name)
            const permission = await PermissionsModel.create({name,description})
            if(!permission) throw new createHttpError.InternalServerError('Permission creating failed')
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : 'Permission created successfully'
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getPermissionByName(name){
        const permission = await PermissionsModel.findOne({name})
        if(permission) throw new createHttpError.BadRequest('Permission already exists!')
    }
}

module.exports = {
    PermissionController: new PermissionController()
}