const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const mongoose=require("mongoose")

const list=require("./api/routes/route")
const login=require("./api/routes/login")
const signup=require("./api/routes/signup")
const home=require("./api/routes/home")

app.use(bodyparser.urlencoded( {extended: false} ) )
app.use(bodyparser.json())

mongoose.connect("mongodb+srv://naman:naman@cluster0.fkx7g5o.mongodb.net/twitterUsers?retryWrites=true&w=majority")
        .then(()=>console.log('Connection to DB successful!'))
        .catch(()=>console.log('Connection to DB UNsuccessful!')) 

app.use("/posts",list)

app.use("/home",home)
app.use("/home/login",login)
app.use("/home/signup",signup)

app.use((req,res)=>{
    res.status(404).json({message:"error occured"})
})

module.exports=app