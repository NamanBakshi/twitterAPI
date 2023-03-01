const express=require("express")
const router=express.Router()
const Post =require("../models/model")
const mongoose=require("mongoose")


router.get("/all",(req,res)=>{
    Post.find()
        .then(post=>res.status(200).json({message:"posts successfully loaded",posts:post}))
        .catch(err=>res.status(404).json({mess:"posts couldnt be loaded"}))
    //res.status(200).json({mess:"dont mess with get request"})
})

router.get("/:name",(req,res)=>{
    const n=req.params.name
    Post.find({username:n})
        .then(post=>{
            if(post.length!=0){
                res.status(200).json({message:`${n} posts successfully loaded`,posts:post})
            }
            else{
                res.status(200).json({message:"user not found"})
            }
        })
        .catch(err=>res.status(404).json({mess:`${n} posts couldnt be loaded`}))

})

router.get("/:name/:id",(req,res)=>{
    Post.findOne({_id:req.params.id})
        .then(result=>res.status(200).json({message:"post found",data:result}))
        .catch(err=>res.status(400).json({message:"post not found",error:err}))
    
})


router.post("/:name",(req,res)=>{
      const obj=new Post({
        _id:new mongoose.Types.ObjectId(),
        data:req.body.content,
        username:req.body.name,
        password:req.body.pass
      })
      obj.save()
        .then(result=>res.status(201).json({message:"post saved successfully",data:result}))
        .catch(err=>res.status(500).json({message:"post not saved",error:err}))
})

router.delete("/:id",(req,res)=>{
    Post.deleteOne({_id:req.params.id})
        .then(result=>res.status(203).json({message:"deletion successful"}))
        .catch(err=>res.status(400).json({message:"page not found"}))
})

router.delete("/:name/:id",(req,res)=>{
    Post.find({_id:req.params.id})
        .then(result=>{
            if(result[0].username === req.params.name || req.params.name === "admin"){
                Post.remove({_id:req.params.id})
                    .then(result=>res.status(203).json({message:"post deletion successfull",data:result}))
                    .catch(err=>res.status(500).json({message:"internal server error",error:err}))
            }else{
                res.status(404).json({message:"you are not allowed to delete someones else post",data:result})
            }
        })
        .catch(error=>res.status(404).json({message:"post not found",err:error}))
    
})



router.patch("/:name/:id",(req,res)=>{
    const newObj={
        data:req.body.content
        // username:req.body.name,
        // password:req.body.pass
    }
    Post.findOneAndUpdate({_id:req.params.id},newObj) //will return object instead of array of objects
        .then(result=>
            
                //if(req.params.name === result.username){   no need of this as path mei phle hi owner aayega
                    // Post.updateOne({username : req.params.name},newObj)
                    //     .then(result=>res.status(203).json({message:"upation successful",data:result}))
                    //     .catch(err=>res.status(404).json({message:"upation UNsuccessfull",data:err})
                    //     )
                //}
                res.status(203).json({message:"updation successful"})
            )
        .catch(err=>res.status(404).json({message:"post not found",error:err}))
    })
        

module.exports=router