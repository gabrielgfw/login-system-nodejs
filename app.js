const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');

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
app.user(express.urlencoded({extended: false}))

// Routes Config:
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(3000);