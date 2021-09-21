module.exports.post =function(req,res){
    //res.end('<h1> POST </h1>');
    return res.render('users',{
        title :"posts"
        });
}