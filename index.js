const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss', //place where scss file is
    dest:'./assets/scss', 
    debug: true,          //do i need to show error which exists during compilation
    outputStyle:'expanded',
    prefix: '/css'        //where should server look for css file
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyle', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('post', './posts')

//mongo store is used to store the ession cookie in the db
app.use(session({
    name: 'codeial',
    //TO DO change the secret before deployment  in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//while using passport initialize routes after initializing routes as passports are also middlewares
//use expres router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});



