const { PermissionsModel } = require("../../../../models/permission");
const { copyObject, deleteInvalidPropertiesInObject } = require("../../../../utils/functions");
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
    async removePermission(req,res,next){
        try {
            const {id} = req.params
            await this.getPermissionById(id)
            const removePermissionResult = await PermissionsModel.deleteOne({_id : id})
            if(!removePermissionResult.deletedCount) throw new createHttpError.InternalServerError('Permission deleting failed')
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message : 'Permission deleted successfully'
                }
            })
        } catch (error) {
            next(error)
        }
    }async updatePermissionById(req,res,next){
        try {
            const {id} = req.params;
            await this.getPermissionById(id)
            const data = copyObject(req.body)
            deleteInvalidPropertiesInObject(data , [])
            const updatePermissionResult = await PermissionsModel.updateOne({_id :id} , {$set : data})
            if(!updatePermissionResult.modifiedCount) throw new createHttpError.InternalServerError('Permission updating failed')
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message : 'Permission updated successfully'
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
    async getPermissionById(_id) {
        const permission = await PermissionsModel.findOne({_id});
        if (!permission) throw new createHttpError.NotFound("permission not found!");
        return permission
      }
}

module.exports = {
    PermissionController: new PermissionController()
}