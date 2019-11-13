const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schema = new Schema({
    name:{type:String,
         required:true,
          trim:true},
    email:{type:String,
         required:true,
          lowercase:true,
           trim:true},
    lsno:{type:String,
        required:true,
        lowercase:true,
        trim:true},           
    gender:{
        type:String,
        required:true
    },
    password:{type:String,
        required:true,
        trim:true},        
    date:{type:Date,
        default:Date.now,
        },           
})
module.exports =mongoose.model('doctor', schema)