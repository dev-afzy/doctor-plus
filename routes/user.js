var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')


//model
//user
const User = require('../model/user')

//doctor
const Doctor = require('../model/doctor')

//Department
const Dept = require('../model/dept')

//Appointment details
const Book = require('../model/book')


/* GET users profile. */
router.get('/profile', isAuthenticated,(req, res)=> {
  
  return res.render('user/profile');
  
});

/* GET users BOOK. */
router.get('/book/:id',isAuthenticated,(req, res, next)=> {
  var doc_id = req.params.id
  Doctor.findById(doc_id,(err, doc)=>{
    if(err){
      console.log(err)
    }
  console.log(doc.name)
  res.render('user/book',{ book1:1,id:doc_id, name:doc.name});
  })
});

/* Post users BOOK. */
router.post('/book',isAuthenticated,(req, res, next)=> {
  const {name, phone, email, dob, doctor, doctor_id, app_date, message} = req.body
  const book = new Book({
    user:req.user.id,
    name:name,
    phone:phone,
    email:email,
    dob:dob,
    doctor:doctor,
    doctor_id:doctor_id,
    app_date:app_date,
    message:message
  })
  book.save().
  then(
    
    res.render('index',))
  .catch(console.log("some error occured"))
 
  console.log(req.body)
  
});

/* GET users Department. */
router.get('/department',(req, res)=> {

  Dept.find((err,doc)=>{
    var deptchunk = []
    var chunksize = 4
    for (var i = 0; i < doc.length; i+=chunksize){
      deptchunk.push(doc.slice(i, i+chunksize))
    } res.render('user/department', {dept:deptchunk});
  })
 
  
});

/* GET users Department. */
router.get('/depsub/:id',(req, res)=> {
  var dept = req.params.id
  Dept.findById(dept,(err, depttitle)=>{
    if(err){
      return err
    }
     
    Doctor.find({department:depttitle.title},(err, docs)=>{
      var doctorchunks=[]
      var chunksize = 4
      for(var i = 0; i < docs.length; i+=chunksize){
        doctorchunks.push(docs.slice(i, i+chunksize))
      }
      
     return res.render('user/depsub', { doctors:doctorchunks, deptname:depttitle.title })
    })
    
  })
  
  
  
});

/* GET Doctor. */
router.get('/doctors',(req, res)=> {
  Doctor.find((err, docs)=>{
    var doctorchunks=[]
    var chunksize = 4
    for(var i = 0; i < docs.length; i+=chunksize){
      doctorchunks.push(docs.slice(i, i+chunksize))
    }
   return res.render('user/doctors', { doctors:doctorchunks  })
  })
 
  
});

router.get('/logout',(req, res)=>{
  req.logOut()
  return res.render('user/login', {book:1})
})


router.use('/', forwardAuthenticated, (req, res, next)=>{
  next()
  
})

/* GET users Doctors. */


/* GET users Signup */
router.get('/signup', (req, res)=>{
  res.render('user/signup', {book:1})
})

//get post router
router.post('/signup',(req,res)=>{
  const {name, email, password, password1, dob, gender} = req.body
    let errors = []
    console.log(req.body)

    if (password !== password1)
    {
        errors.push({msg:'Password do not match'})
    }
    if (password.length < 6){
        errors.push({msg:'Password contain atleat 6 Carcters'})
    }

    if(errors.length > 0){
        req.flash(errors)
        console.log(errors.msg)
        console.log(req.body)
        res.render('user/signup',{
            errors,name,email, dob, gender, password, password1
        })
    }
    else{
        //Validation passed
        User.findOne({email:email})
        .then(user=>{
            //User exisr
            if(user){
                errors.push({msg:'email already exist'})
                // req.flash('error_msg', errors[msg])
                console.log(errors)
                res.render('user/signup',{
                    errors,
                    name,
                    email,
                    dob,
                    gender,
                    password,
                    password1,
                    
                })
            }else{
                const newuser = new User({
                    name,
                    email,
                    dob,
                    gender,
                    password
                })
                //hash passsword
                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newuser.password, salt, (err, hash)=>{
                    // if (err) throw err;
                    
                        //set password to hash
                        newuser.password = hash
                        //save user
                        newuser.save()
                        .then(user=>{
                            // req.session.email = email;
                            req.flash('success_msg', 'welcome')
                            
                          return res.redirect('/')
                        })
                        .catch(err=>console.log(err))
                    
                    })
                })
                console.log(newuser)
                
            }
        }).catch(err => console.log(err));
    }
    
})

/* GET users Login. */
router.get('/login',(req,res)=>{
  console.log(req.flash('error'));
  return res.render('user/login',{book:1})
  
})

// //post users login

router.post('/login', (req, res, next)=>{
  const email = req.body.email
  let errorss = []
  passport.authenticate('user', (err, user, info)=> {
      if (err) { return next(err); }
      if(!user){    
          console.log(req.body)
          errorss.push({msg:'Email or password is incorrect'})
          console.log(errorss)
      return res.render('user/login', {errorss, email,book:1}) 
      }
       
      req.logIn(user, (err)=> {
        if (err) { return next(err); }
        
      // req.session.email = email;
      return  res.redirect('/')
      })
    })(req, res, next)
})

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/user/login');
}
function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');      
}

module.exports = router;
