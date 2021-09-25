const Post = require('../models/post')  //requiring posts schema
const Comment = require('../models/comment');

module.exports.create = function(req, res){ //creating post from the form in home.ejs
    Post.create({
        content: req.body.content, //name of the textarea is content so req.body.content and in schema also we have content field
        user: req.user._id        //user._id is stored becz it is unique 
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
    });
}

module.exports.destroy= function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}