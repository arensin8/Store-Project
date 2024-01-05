const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require('path');
const { getTime } = require("../../../../utils/functions");

class EpisodeController extends Controller{

    async addEpisode(req,res,next){
        try {
            const {title,text, courseId,chapterId , filename,fileUploadPath} = await createEpisodeSchema.validateAsync(req.body)
            const videoPath = path.join(fileUploadPath,filename)
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoPath}`
            const seconds = await getVideoDurationInSeconds(videoURL)
            const time = getTime(seconds)
            return res.json({
                title,text, courseId,chapterId , filename,fileUploadPath,time
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    EpisodeController : new EpisodeController()
}