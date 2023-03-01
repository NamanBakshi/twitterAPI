const express=require("express")
const router=express.Router()

//const jwt=require("jsonwebtoken")

router.get("/",(req,res)=>{
    res.json({mess:"welcome to login page"})
})

module.exports=router;