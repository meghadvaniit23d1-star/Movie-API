const express = require('express');
const path = require('path');

const port = 8002;

const app = express();
const fs = require('fs')
const db = require('./config/database')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use('/css', express.static( path.join(__dirname,'node_modules','bootstrap','dist','css')))
app.use('/js', express.static( path.join(__dirname,'node_modules','bootstrap','dist','js')))

app.use('/uploads', express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded())



var students = require('./models/AddMovieModel')

app.get("/", async function(req,res){
    let stdData = await students.find({})
    console.log("request find");
    res.render("home",{
        'titles' : "MOVIE APP",
        'record' : stdData
    })
})

app.post("/addStudents",students.fileUploads, async function(req,res){
    console.log(req.body);
    console.log(req.file);

    if(req.file){
        req.body.image =students.imagePath +'/'+req.file.filename
    }
    
  await  students.create(req.body)
    return res.redirect("/")
})

app.get("/deleteStudent/:studentPos", async function(req,res){
 let stuid = req.params.studentPos

 let singleObj = await students.findById(stuid)
 console.log(singleObj.image)
 if(singleObj.image){
    let imagPath = path.join(__dirname,singleObj.image);
    await fs.unlinkSync(imagPath)
    
 }


await students.findByIdAndDelete(stuid)
 return res.redirect("/")
})
app.get("/updateStudent",async function(req,res){
 index = req.query.stdPos;
 let singleStudent = await students.findById(index)

 return res.render('Edit',{
    singleStudent,
    index
 })

})

app.post("/editStudents/:id", async (req,res) =>{
    console.log(req.body);
     if(req.file){
        req.body.image =students.imagePath +'/'+req.file.filename
    }
    
    // let id = req.params.id;
    // let updatedStudent = await students.findByIdAndUpdate(id,req.body,{new:true})
    // return res.redirect("/")
    // })

    
    await students.findByIdAndUpdate(req.params.id,req.body)
    return res.redirect("/")
})

app.get("/addStudentform",(req,res)=>{
    return res.render("add")
})

app.listen(port, (err)=>{
    err? console.log(err):console.log('Server is running');
    
})