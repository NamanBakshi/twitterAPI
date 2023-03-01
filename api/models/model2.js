const mongoose=require("mongoose")

const schema2=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId
    ,
    username:String
    // {
    //     type:String,

    // }
    ,
     email:String
    // {
    //     type:String,
    // }
    ,
    password:String
    // {
    //     type:String
    // }
})

module.exports=mongoose.model('user',schema2)