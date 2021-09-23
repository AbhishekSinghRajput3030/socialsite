const Post = require('../models/post')  //requiring posts schema

module.exports.create = function(req, res){ //creating post from the form in home.ejs
    Post.create({
        content: req.body.content, //name of the textarea is content so req.body.content and in schema also we have content field
        user: req.user._id        //user._id is stored becz it is unique 
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}