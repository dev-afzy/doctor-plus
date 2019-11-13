var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
return res.render('index');
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
