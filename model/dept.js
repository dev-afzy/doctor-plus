const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schema = new Schema({
    imgpath:{type:String,
         required:true,
          trim:true,
          
          },
    title:{type:String,
         required:true,          
           trim:true,
           
           }

        })
        
module.exports =mongoose.model('dept', schema)