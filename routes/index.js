var express = require('express');
var router = express.Router();
const doctor = require('../model/doctor')

/* GET home page. */
router.get('/',function(req, res, next) {
  doctor.find((err, docs)=>{
    var doctorchunks=[]
    var chunksize = 4
    for(var i = 0; i < docs.length; i+=chunksize){
      doctorchunks.push(docs.slice(i, i+chunksize))
    }
   return res.render('index', { title: 'Doctor', doctors:doctorchunks  })
  })

});

router.use('/', (req, res, next)=>{
  // return res.render('user/login',{book:1})
  return  next()
  })


/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin',{admin:1});
});

// /* GET users Department. */
// router.get('/department', (req, res, next)=> {
//   // res.send("department")
//   res.render('user/department');
  
// });


module.exports = router;
