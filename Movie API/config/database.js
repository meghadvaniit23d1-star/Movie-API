const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost:27017/movie')

const db = mongoose.connection

db.once('open',(err)=>{
    err?console.log(err):console.log("Database Connected Successfully");
    ;
    
})

module.exports = db;