const {default : mongoose} = require('mongoose');

const Schema = new mongoose.Schema({
        title : {type : String , required : true},
})

module.exports = {
        CategoriesModel : mongoose.model("category", Schema)
}