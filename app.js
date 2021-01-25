const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require("./config/passport")(passport);


mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("Error: " + err);
});

// EJS Config:
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

// Body Parse Config:
app.use(express.urlencoded({extended: false}));

// Express Session:
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passoport Config (login authenticator):
app.use(passport.initialize());
app.use(passport.session());

// Flash Config:
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes Config:
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(3000);