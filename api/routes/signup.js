const express=require("express")
const { default: mongoose } = require("mongoose")
const router=express.Router()
const user=require("../models/model2")

router.get("/",(req,res)=>{
    res.json({message:"welcome to signup page"})
})

router.post("/",(req,res)=>{
    const data=new user({
        _id:new mongoose.Types.ObjectId(),
        username:req.body.uname,
        email:req.body.mail,
        password:req.body.pass
    })

    data.save()
        .then(dat=>res.status(203).json({mess:"user sign up successful",userdata:dat}))
        .catch(err=>res.status(400).json({mess:"signup UNsuccessful",error:err}))
})

router.get(res=>{
    res.status(400).json({mess:"use other route"})
})

module.exports=router;