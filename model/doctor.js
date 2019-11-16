const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schema = new Schema({
    name:{type:String,
         required:true,
          trim:true,
          default:''},
    email:{type:String,
         required:true,
          lowercase:true,
           trim:true,
           default:''},
    lsno:{type:String,
        required:true,
        lowercase:true,
        trim:true,
        default:''},           
    gender:{
        type:String,
        required:true,
        default:''
    },
    password:{type:String,
        required:true,
        trim:true,
        default:''},        
    date:{type:Date,
        default:Date.now,
        },
    type:{
        type:Number,
        default:1
    }               
})
module.exports =mongoose.model('doctor', schema)