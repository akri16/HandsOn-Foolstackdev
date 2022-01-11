const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// Register view engine: EJS. By default searches in the 'view' folder
app.set('view engine', 'ejs');

// Processes requests from the top to the bottom
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/about", (req, res) => {
    res.render('about');
});

// Redirect
app.get("/about-us", (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});