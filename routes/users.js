const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/register", (req, res) => {
    res.render('register');
});

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    console.log("Name: " + name);
    console.log("E-mail: " + email);
    console.log("Password: " + password);

    // Submit Validations:

    if(!name || !email || !password || !password2) {
        errors.push({ msg: "All fields must bet filled." });
    }
    if(password !== password2) {
        errors.push({ msg: "Passwords dont match" });
    }
    if(password.length < 8) {
        errors.push({ msg: "Password need at least 8 characters" });
    }

    if(errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        });
    } else {
        User.findOne({
            email: email
        }).exec((err, user) => {
            console.log("User:");
            console.log(user);

            // Checking if e-mail is avaliable
            if(user) {
                errors.push({ msg: "Email has already been registered" });
                res.render('register', {
                    errors: errors,
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                });

            // Success
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                // Encrypt user's password:
                // Using bcrypt.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Error:
                        if(err) {
                            throw err;
                        }
                        // Success:
                        newUser.password = hash;
                        // Saving in DataBase / redirect to login:
                        newUser.save().then((value) => {
                            console.log(value);
                            req.flash("success_msg", "Success - Account has been registered.")
                            res.redirect("/users/login");
                        }).catch(value => { console.log(value) });
                    });
                });
            }        

        });
    }
});

router.post("/login", (req, res, next) => {

});

router.get("/logout", (req, res) => {

});

module.exports = router;