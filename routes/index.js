const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("Welcome");
});

router.get("/register", (req, res) => {
    res.render("Register");
});

module.exports = router;