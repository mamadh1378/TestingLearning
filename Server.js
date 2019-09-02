// Used For The Responding And Requesting.
const express = require('express');
// Used For Tagging The hbs File Formates. I mea {{}} Tag.
const hbs = require('hbs');
// For Heroku
const Port = process.env.Port || 3000;

// Introduces The Application
var app = express();
// Says Where To Find Partials
hbs.registerPartials('./views/Partials');
// Gives The Whole App Power Of Hbs.
app.set('view engine', 'hbs');
// This Is A Helper. This Will Use For Partials. Watch The Word 'Year' In views/Partials/Footer.hbs.
hbs.registerHelper('Year', () =>
{
    return new Date().getFullYear();
});
// This Is Another Helper But With Enterance.
hbs.registerHelper('Upper', (Text) =>
{
    Text = String(Text);
    return Text.toUpperCase();
});

app.use((req, res, next) =>
{
    console.log('before');
    next();
    console.log('Next');
});

app.use((req, res, next) =>
{
    res.render('Maintain.hbs');
});

//#region First Method
// (( First Method ))
// For The Base Domain Gives This Respond.
app.get('/', (req, res) => 
{
    res.send('Hello Express.');
});

app.get('/error', (req, res) =>
{
    res.send('<html><head><title>ERROR</title></head><body><h1>صفحه مورد نظر یافت نشد.</h1></body></html>');
});
//#endregion

//#region Second Method
// Adds All Html Files To The Domain.
app.use(express.static('./FrontEnd'));
//#endregion

//#region Third Method
// (( Third Method ))
// For The About Page Gives This Respond.
app.get('/About', (req, res) => 
{
    // Don't Give The Actual Address
    res.render('About.hbs', 
    {
        Title: 'About Page',
        WelcomeMessage: 'Welcome Dear'
    });
});
//#endregion

// Server Listens On Port 3000
app.listen(Port, () =>
{
    console.log(`Server is up on port ${Port}.`);
});