var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')


//model
const User = require('../model/user')

/* GET users profile. */
router.get('/profile', isAuthenticated,(req, res)=> {
  // res.send("department")
  res.render('user/profile');
  
});

/* GET users BOOK. */
router.get('/book',isAuthenticated,(req, res, next)=> {
  // res.send("department")
  res.render('user/book',{ book1:1});
  
});

/* GET users Department. */
router.get('/department',(req, res)=> {
  // res.send("department")
  res.render('user/department');
  
});

router.get('/doctors',(req, res)=> {
  // res.send("department")
  res.render('user/doctors');
  
});

router.get('/logout',(req, res)=>{
  req.logOut()
  res.render("user/login", {book:1})
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
                            
                            res.redirect('/')
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
  res.render('user/login',{book:1})
  
})

// //post users login

router.post('/login', (req, res, next)=>{
  const email = req.body.email
  let errorss = []
  passport.authenticate('user-local', (err, user, info)=> {
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
        res.redirect('/')
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
