const express = require('express');
const mongoose = require('mongoose');
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
                render(res, errors, name, email, password, password2);

            // Success
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
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