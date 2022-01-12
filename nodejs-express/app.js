const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// Register view engine: EJS. By default searches in the 'view' folder
app.set('view engine', 'ejs');

// Processes requests from the top to the bottom
app.get("/", (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: "Home", blogs });
});

app.get("/about", (req, res) => {
    res.render('about', { title: "About" });
});

app.get("/blogs/create", (req, res) => {
    res.render('create', { title: "Create" });
});

// Redirect
app.get("/about-us", (req, res) => {
    res.redirect('/about', { title: "About" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});