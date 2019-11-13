var express = require('express');
var express = require('express');
const bcrypt = require('bcryptjs')
const passport = require('passport')

var router = express.Router();

//model
const Doctor = require('../model/doctor')

/* GET doctors listing. */
router.get('/',isAuthenticated,(req, res, next) =>{
  return res.render("doctor/login", {book:1})
});

 /* GET Doctor Login. */
router.get('/appointment',isAuthenticated, (req,res)=>{
  res.render('doctor/appointment',{profile:1})
})
  
  /* GET Doctot profile. */
router.get('/profile', isAuthenticated, (req, res)=> {
  // res.send("department")
  res.render('doctor/profile',{profile:1});
    
});

router.get('/logout',(req, res)=>{
  req.logOut()
  return res.render("doctor/login", {book:1})
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
  const {name, email,lsno, gender, password, password1} = req.body
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
            errors,name,email, lsno, gender, password, password1
        })
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
                    password,
                    password1,
                    
                })
            }else{
                const newuser = new Doctor({
                    name,
                    email,
                    lsno,
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
                        .then(doctor=>{
                            // req.session.email = email;
                            req.flash('success_msg', 'welcome')
                            
                            res.redirect('doctor/profile')
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
  passport.authenticate('local-doctor', (err, doctor, info)=> {
      if (err) { return next(err); }
      if(!doctor){    
          console.log(req.body)
          errorss.push({msg:'Email or password is incorrect'})
          console.log(errorss)
      return res.render('doctor/login', {errorss, email,book:1}) 
      }
       
      req.logIn(doctor, (err)=> {
        if (err) { return next(err); }
        
      // req.session.email = email;
        res.redirect('doctor/profile')
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
    res.redirect('doctor/appointment');      
  }
  
module.exports = router;