const express = require('express');
const cookieParser = require('cookie-parser');
const db=require('./config/mongoose');
const app = express();
const port =8000;
const expressLayouts = require('express-ejs-layouts');


app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout.ejs
app.set('layout extractStyle',true);
app.set('layout extractScripts',true);

//use expres router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.set('profile','./users')
app.set('post','./posts')


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});



