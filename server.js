const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    taskRoutes = require('./routes/tasks'),
    indexRoutes = require('./routes/index');


// connet to DB
mongoose.connect('mongodb+srv://hamdy:fasterzero@fob.jtsug.mongodb.net/fob?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(result => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// register view engine
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: "God help me please",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// middleware and static folies
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}


app.get("/", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('index');
})

// task routes
app.use('/tasks', isLoggedIn, taskRoutes)

// user
app.use(indexRoutes)