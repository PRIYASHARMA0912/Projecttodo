const passport = require('passport');
const Localstrategy = require('passport-local') .Strategy;

const users = [
    {id: 1 , email:'priyasharma@gmail.com' , password:'Pass'}
    
]

passport.use(new Localstrategy({
    usernameField: 'email',
    passwordField: 'password'
},
   (email , password , done) => {
     const user = users.find(user => {
        return user.email === email
     })
     if(!user)
     {
        return done(null , false , {message:"incorrect email."});
     }
     if(user.password !== password) {
        return done(null , false , {message: "incorrect password"});
     }

     const returnUser = {
        id: user.id,
        isAuthenticated: true
     };
     return done(null , returnUser);
   }
));


passport.serializeUser((user,done) => {
    done(null , user.id)
});

passport.deserializeUser((id ,done) => {
    const user = users.find(user => user.id === id);
    return done(null,user);
});

module.exports= passport
