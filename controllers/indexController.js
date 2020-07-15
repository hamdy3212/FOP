//register_get, register_post, login_get, login_post, logout
const
    passport      = require('passport'),
    User          = require('../models/user'),
    register_get  = (req, res) => {
        res.render('register');
    },
    register_post = (req, res) => {
        const data = req.body;
        const newUser = new User({ username: data.username, firstname: data.firstname, lastname: data.lastname, branch: data.branch, position: data.position });
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
    login_get     = (req, res) => {
        res.render('login');
    },
    login_post    = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),
    logout        = (req, res) => {
        req.logOut();
        res.redirect('/');
    };
module.exports = {
    register_get,
    register_post,
    login_get,
    login_post,
    logout
}