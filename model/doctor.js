const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schema = new Schema({
    name:{type:String,
         required:true,
          trim:true,
          },
    email:{type:String,
         required:true,
          lowercase:true,
           trim:true,
           },
    lsno:{type:String,
        required:true,
        lowercase:true,
        trim:true,
        },           
    gender:{
        type:String,
        required:true,
        
    },
    department:{
        type:String,
        required:true,
        
    },
    password:{type:String,
        required:true,
        trim:true,
        },        
    date:{type:Date,
        default:Date.now,
        },
    img:{
        type:String,
        trim:true
    },
    phone:{
        type:Number,
        trim:true
    },
    profession:{
        type:String,
        trim:true
    },
    experiance:{
        type:Number,
    },
    fees:{
        type:Number,
        trim:true
    },
    availability:{
        type:String,
        trim:true
    },
    bio:{
        type:String,
        
    },
    
    type:{
        type:Number,
        default:1
    }               
})
module.exports =mongoose.model('doctor', schema)