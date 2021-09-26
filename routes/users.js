const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing users_controllers fron users.js we go one step up to
//folder-controllers and then access its child users_controlers
const usersController = require('../controllers/users_controller');

//now we need to map this routes to users_controller (profile fn)(action)
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create', usersController.create);
//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in' },
), usersController.createSession);

//router to sign out
router.get('/sign-out',usersController.destroySession);

module.exports = router;