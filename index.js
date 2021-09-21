const express = require('express');
const app = express();
const port =8000;
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