const   express         = require('express'),
        router          = express.Router(),
        indexController = require('../controllers/indexController');

// register
router.get('/register', indexController.register_get);
router.post('/register', indexController.upload.single('profilePicture'), indexController.register_post);

// login
router.get('/login', indexController.login_get);
router.post('/login', indexController.login_post);

// logout
router.get('/logout', indexController.logout);

module.exports = router;