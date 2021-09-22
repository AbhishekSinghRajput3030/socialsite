const express = require('express');
const router = express.Router();

//accessing users_controllers fron users.js we go one step up to
//folder-controllers and then access its child users_controlers
const usersController = require('../controllers/users_controller');

//now we need to map this routes to users_controller (profile fn)(action)
router.get('/profile', usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn)

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);

module.exports = router;