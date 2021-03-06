//import express from 'express';
const express = require('express');
//import env from 'morgan';
const env = require('./config/environment'); 
//import logger from 'morgan'
const logger = require('morgan');
//import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');
//import db from './config/mongoose.js'
const db = require('./config/mongoose');
const app = express();
require('./config/view-helpers')(app)
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//used for session cookie
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash=require('connect-flash')
const customMware = require('./config/middleware')
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path= require('path');
if (env.name =='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),  
        dest:path.join(__dirname,env.asset_path,'css'),
        debug: true,          //do i need to show error which exists during compilation
        outputStyle:'extended',
        prefix: '/css'        //where should server look for css file
    }));

}


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(env.asset_path));  //as path of asset is stored in environment.js

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options))

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used to store the ession cookie in the db
app.use(session({
    name: 'codeial',
    //TO DO change the secret before deployment  in production mode
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);

//while using passport initialize routes after initializing routes as passports are also middlewares
//use expres router
app.use('/',require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});



