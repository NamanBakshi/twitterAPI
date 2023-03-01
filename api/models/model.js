const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    data:mongoose.Schema.Types.String,
    username:mongoose.Schema.Types.String,
    password:mongoose.Schema.Types.String

})
module.exports=mongoose.model('Post',schema)