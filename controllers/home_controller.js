module.exports.home=function(req,res){
    /*we will removed this part of code bcz it sent something directly to the browser and 
    now since we have created view we will rather render it than sending it directly */

    //return res.end('<h1>Express is up for Codeial! </h1>') 

    return res.render('home',{
        title: "Home"
    });
}
// module.exports.actionName = function(req,res) {}