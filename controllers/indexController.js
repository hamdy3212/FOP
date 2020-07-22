//register_get, register_post, login_get, login_post, logout
const
    passport = require('passport'),
    User = require('../models/user'),
    multer = require('multer'),
    fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    upload = multer({
        storage: storage,
        limit: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    }),
    register_get = (req, res) => {
        res.render('register');
    },
    register_post = (req, res) => {
        const data = req.body;
        const newUser = new User();
        newUser.username = data.username;
        newUser.firstname = data.firstname;
        newUser.lastname = data.lastname;
        newUser.branch = data.branch;
        newUser.committee = data.committee;
        newUser.degree = data.degree;
        newUser.position = data.position;
        if (typeof req.file === "undefined") {
            newUser.profilePicture = '/uploads/timmy.png'
        } else {
            newUser.profilePicture = req.file.path;
        }

        User.register(newUser, req.body.password,
            (err, user) => {
                if (err) {
                    console.log(err)
                    return res.render('register');
                }
                passport.authenticate('local')(req, res, () => {
                    res.redirect("/");
                });
            });
    },
    login_get = (req, res) => {
        res.render('login');
    },
    login_post = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),
    logout = (req, res) => {
        req.logOut();
        res.redirect('/');
    },
    edit = (req, res) => {
        User.findByIdAndUpdate(req.user.id,
            { profilePicture: '/uploads/' + req.file.originalname },
            { new: true },
            (err, updated) => {
                if (err) return console.log(err);
                res.redirect("/");
            }
        );

    }
module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout,
    upload,
    edit
}