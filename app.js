const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session')
require('dotenv').config({})
const db = require('./models')
const { seedData } = require('./seeders/seedDB')


//passport config
require("./config/passport");

// assets middleware
app.use(express.static(__dirname + "/assets"));

// request body parser middleware
app.use(
    express.urlencoded({
        extended: true
    })
);

//Enable session support
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//templating engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");


//routes
require("./routes/r-index")(app);
app.use('/' , (req,res) => {
    return res.render('landing')
})

app.use('/userProfile' , (req,res) => {
    return res.render('userProfile');
})

db.sequelize.authenticate()
.then(() => {
    console.log("Connection has been established succesfully.");
})
.catch((err) => {
    console.error('unable to connect to the database' , err);
});

db.sequelize.sync({
    force: true
}).then(() => seedData())

const PORT = process.env.Port;
app.listen(PORT, () => {
    console.error(`App is Running at http://localhost:${PORT}`);
});