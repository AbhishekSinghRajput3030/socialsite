const express = require('express');
const router = express.Router();

//accessing users_controllers fron users.js we go one step up to
//folder-controllers and then access its child users_controlers
const usersConrtoller = require('../controllers/users_controller');

//now we need to map this routes to users_controller (profile fn)(action)
router.get('/profile', usersConrtoller.profile);


module.exports = router;