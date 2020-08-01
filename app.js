const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

//Connecting mongodb
mongoose.connect('mongodb://localhost/dance_contact', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// let postrequest = require("./routes/post.js");



app.use(express.urlencoded()); //This is the way for taking data from form

app.set('view engine', 'views');  //Using Pug 
app.set('views', './views');

// app.use("/",postrequest);
app.use('/pictures', express.static('pictures'));    //Serving Static files
app.use('/static', express.static('static'));

const contactschema = new mongoose.Schema({
    name: String,
    age: Number,
    phone_no: String,
    email: String,
    description: String
});

const contact = mongoose.model('contact', contactschema);


app.get("/", (req, res) => {
    res.status(200).render("./home.pug")
});


app.get("/home", (req, res) => {
    res.status(200).render("./home.pug")
});

app.get("/contact", (req, res) => {
    res.status(200).render("./contact.pug")
});

app.post("/contact", (req, res) => {
    let form = req.body;
    // console.log(form);
    var mydata = new contact(form);
    mydata.save().then(() => {
        res.status(200).render("./home.pug");
    }).catch(() => {
        res.status(400).render("./contact.pug")
    })
});

app.listen(80, () => {
    console.log("Server starting..")
})