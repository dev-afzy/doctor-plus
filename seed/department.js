const dept = require("../model/dept")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/doctor", {useNewUrlParser:true, useUnifiedTopology: true, useUnifiedTopology: true })


const depts = [new dept({
    imgpath:"https://www.msrmc.ac.in/wp-content/uploads/2018/01/gen_med.jpg",
    title:"General Medicine",
 }),new dept({
    imgpath:"https://www.artofliving.org/sites/www.artofliving.org/files/styles/blog_promoted_featured/public/unity2/blog_image/Why-Ayurvedic-therapies-can-revolutionize-anti-aging%2C.jpg?itok=7MmZZWKK",
    title:"Ayurvedic",

}),new dept({
    imgpath:"https://www.alkemlabs.com/images/title-banner/cardiology1.jpg",
    title:"Cardiology",

}),new dept({
    imgpath:"https://www.manhattansurgical.com/images/ear-nose-and-throat.jpg",
    title:"Ear nose and throat (ENT)",

}),new dept({
    imgpath:"https://www.kauveryhospital.com/images/care/inside/Gastroenterology.jpg",
    title:"Gastroenterology",

}),new dept({
    imgpath:"https://health.adelaide.edu.au/medicine/sites/default/files/styles/ua_image/public/2017-09/obstetrics.jpg?itok=uCmA5pkK",
    title:"Gynaecology",

}),new dept
({
    imgpath:"https://www.fortishealthcare.com/speciality_banner/mobile/Paediatric-Nephrology.jpg",
    title:"Nephrology",
 }),new dept({
    imgpath:"https://www.bmc.org/sites/default/files/Patient%20Care%20Images/Neurology-307x287.jpg",
    title:"Neurology",

}),new dept({
    imgpath:"https://www.roche.com/dam/jcr:296f70a4-63d8-416f-8847-983d5349c45d/en/pathways_720x405.jpg",
    title:"Oncology",

}),new dept({
    imgpath:"https://www.nicklauschildrens.org/NCH/media/img/hero/ophthalmology_mobile.jpg",
    title:"Ophthalmology",

}),new dept({
    imgpath:"http://www.curryhealthnetwork.com/pictures/content/112107.jpg",
    title:"Orthopaedics",

}),new dept({
    imgpath:"https://media.angieslist.com/styles/square_thumbnail_large/s3/s3fs-public/pediatrician_1.jpg?itok=-4A8s5xy",
    title:"Pediatrician",

})
]
var done = 0
    for(var i=0; i < depts.length; i++){
    depts[i].save((error, result)=>{
    done++
    if (done === depts.length){
        exit()
    }
})}
function exit(){
    mongoose.disconnect()
}