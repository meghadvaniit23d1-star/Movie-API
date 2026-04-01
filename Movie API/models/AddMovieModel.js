const { title } = require('ejs')
const mongoose = require ('mongoose')
const multer = require('multer')

const path = require ('path')
const movieImg = '/uploads'

const movieModel = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    rating :{
        type : String,
        required : true
    },
    language :{
        type : String,
        required : true
    },
    genre : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    cast :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : true
    }

})

const movstorage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,path.join(__dirname,'..',movieImg))
    },
    filename : function(req,file,cb){
        cb(null , file.fieldname +'-'+ Date.now())
    }
})

movieModel.statics.fileUploads = multer({storage:movstorage}).single('image')
movieModel.statics.imagePath = movieImg 
const movie = mongoose.model('Movie',movieModel)

module.exports = movie