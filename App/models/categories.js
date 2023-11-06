const {default : mongoose} = require('mongoose');

const Schema = new mongoose.Schema({
        title : {type : String , required : true},
        parent : {type :mongoose.Types.ObjectId , default : undefined},
})

module.exports = {
        CategoriesModel : mongoose.model("category", Schema)
}