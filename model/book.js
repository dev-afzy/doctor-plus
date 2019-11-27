const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema =new Schema({
    user:{type:String,
        required:true
},    
    name:{type:String,
        required:true
}, 
     phone:{type:Number,
        required:true
},  
    email:{type:String,
        required:true
}, 
    dob:{type:String,
        required:true
},
    doctor:{type:String,
        required:true
},
    doctor_id:{type:String,
        required:true
},
    app_date:{type:String,
        required:true
},
    message:{type:String
}
})

module.exports = mongoose.model('book', schema)