var express = require('express');
var express = require('express');
const bcrypt = require('bcryptjs')
const passport = require('passport')


var router = express.Router();

//model
const Doctor = require('../model/doctor')
const Book = require('../model/book')

/* GET doctors listing. */
router.get('/',(req, res, next) =>{
  return res.render("doctor/login", {book:1})
});

 /* GET Doctor Login. */
router.get('/appointment',isAuthenticated,(req,res)=>{
  
  Book.find({doctor_id:req.user.id},(err, doc)=>{
    if(err){
      console.log(err)
    }
    var book = []
    var count = []
    for(var i = 1; i <= doc.length; i++){
      book.push(doc.slice(i, i+1))
     
    }
    // for (i= 1; i <= doc.length; i++){
    //   count = i 
    //   var data = book.concat(count)
    //   console.log(data)
    //   // console.log(i)
    // }
    console.log(count)
    console.log(book)
    res.render('doctor/appointment',{profile:1, details:book, count:count})
  })
 
})
  
  /* GET Doctot profile. */
router.get('/profile',isAuthenticated, (req, res)=> {
  // res.send("department")
  res.render('doctor/profile',{profile:1});
    
});

router.get('/logout',(req, res)=>{
  req.logOut()
  return res.render("doctor/login", {profile:1, doctor:1})
})

router.use('/', forwardAuthenticated, (req, res, next)=>{
  next()
  
})

/* GET Doctor Signup */
router.get('/signup',(req,res)=>{
    res.render('doctor/signup',{doctor:1})
  })


//get post router
router.post('/signup',(req,res)=>{
  const {name, email,lsno, gender,department, password, password1} = req.body
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
        res.render('doctor/signup',{
            errors,name,email, lsno, gender,department, password, password1
        ,doctor:1})
    }
    else{
        //Validation passed
        Doctor.findOne({email:email})
        .then(doctor=>{
            //User exisr
            if(doctor){
                errors.push({msg:'email already exist'})
                // req.flash('error_msg', errors[msg])
                console.log(errors)
                res.render('doctor/signup',{
                    errors,
                    name,
                    email,
                    lsno,
                    gender,
                    department,
                    password,
                    password1,
                    
                })
            }else{
                const newuser = new Doctor({
                    name,
                    email,
                    lsno,
                    gender,
                    department,
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
                        .then(doctor=>{
                            // req.session.email = email;
                            req.flash('success_msg', 'welcome')
                            
                            res.redirect('/doctor/profile')
                        })
                        .catch(err=>console.log(err))
                    
                    })
                })
                console.log(newuser)
                
            }
        }).catch(err => console.log(err));
    }
    
})
  
 /* GET Doctor Login. */
router.get('/login',(req,res)=>{
  res.render('doctor/login',{doctor:1})
})
  
  // //post doctor login

router.post('/login', (req, res, next)=>{
  const email = req.body.email
  let errorss = []
  passport.authenticate('doctor',(err, user, info)=> {
      if (err) { return next(err); }
      if(!user){    
          console.log(req.body)
          errorss.push({msg:'Email or password is incorrect'})
          console.log(errorss)
          return res.render('doctor/login', {errorss, email,book:1}) 
      }
       
      req.logIn(user, (err)=> {
        if (err) { return next(err); }
        // req.session.email = email;
        return res.redirect('/doctor/profile')
      })
    })(req, res, next)
})

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/doctor/login');
  }
  function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/doctor/appointment');      
  }
  

module.exports = router;