const passport = require('passport');
const Localstrategy = require('passport-local') .Strategy;


 console.log("passport called");
passport.use(new Localstrategy({
    usernameField: 'email',
    passwordField: 'password'
},
   async (email , password , done) => {
     const findUser = await user.findOne({email})
     if(!findUser)
     {
        return done(null , false , {message:"incorrect email."});
     }
     if(!validatePassword(password , findUser.password)) {
        return done(null , false , {message: "incorrect password"});
     }
     console.log("user2");
     
     return done(null , findUser);
   }
));


passport.serializeUser((user,done) => {
    done(null , user.id)
});

passport.deserializeUser(async (id ,done) => {
    const findUser = await user.findOne({id})
    return done(null,findUser);
});

module.exports= passport
