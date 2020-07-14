const   express         = require('express'),
        router          = express.Router(),
        passport        = require('passport'),
        indexController = require('../controllers/indexController');

// register
router.get('/register', indexController.register_get);
router.post('/register', indexController.register_post);

// login
router.get('/login', indexController.login_get);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
})
);

// logout
router.get('/logout', indexController.logout);

module.exports = router;