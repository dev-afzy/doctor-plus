const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schema = new Schema({
    img:{type:String

    },
    name:{type:String,
         required:true,
          trim:true},
    email:{type:String,
         required:true,
          lowercase:true,
           trim:true},
    phone:{
        type:String,
        default:"Please Update your Phone number"
        },       
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
    
    city:{
        type:String,
        default:"Please Update your city"
    },
    zip:{
        type:String,
        default:"Please Update your zip code"
    },    
    date:{type:Date,
        default:Date.now,
        },           
})
module.exports =mongoose.model('user', schema)

