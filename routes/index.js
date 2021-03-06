const express = require('express')
const router = express.Router();


//acesing controller from this router
const homeController = require('../controllers/home_controller');
//any reuest that comes only with forward slash is forwarded to home_controller
router.get('/',homeController.home); 

/*considering this as the index of other routes we want this to control the other routes*/

/*any request that comes with forward slash appended, it with user  will be forwarded 
to users routes similarly we will creates for like comment etc also*/
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes', require('./likes'));
//for any further routes ,access from here
//router.use('/routerName',require('./routerfile));
router.use('/api',require('./api'));

module.exports = router;