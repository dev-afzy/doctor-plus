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
    password:{type:String,
        required:true,
        trim:true},
    dob :{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },    
    date:{type:Date,
        default:Date.now,
        },           
})
module.exports =mongoose.model('user', schema)