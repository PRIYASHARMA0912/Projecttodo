const passport = require('passport');
const Localstrategy = require('passport-local') .Strategy;
const { validatePassword } = require('../controller/commonController')
const user = require('../models/users')
 console.log("passport called");
passport.use(new Localstrategy({
    usernameField: 'email',
    passwordField: 'password'
},
   async (email , password , done) => {
     const findUser = await user.findOne({email , include: 'role'})
     if(!findUser)
     {
        return done(null , false , {message:"incorrect email."});
     }
     
     if(!validatePassword(password , findUser.password)) {
        return done(null , false , {message: "incorrect password"});
     }
     
     const returnUser = {
        id: findUser.id,
        name: findUser.firstName + ' ' + findUser.lastName,
        email: findUser.email,
        role: findUser.role.authority
     }
     
     return done(null , returnUser);
   }
));


passport.serializeUser((user,done) => {
    done(null , user.id)
});

passport.deserializeUser(async (id ,done) => {
    const findUser = await user.findOne({id , include: 'role'})
    const userData =  {
        id: findUser.id,
        name: findUser.firstName + ' ' + findUser.lastName,
        email: findUser.email,
        role: findUser.role.authority
     }
        
    
    return done(null, userData);
});

module.exports= passport
