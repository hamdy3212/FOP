const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Task = require('./models/task'),
    User = require('./models/user'),
    passport = require('passport'), //
    LocalStrategy = require('passport-local'); //

// connet to DB
mongoose.connect('mongodb://localhost:27017/FOP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

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
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    next();
})
app.use(express.urlencoded({ extended: true }));
const isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


app.get("/", (req, res) => {
    res.render('index');
})
app.get("/tasks/tasklist",isLoggedIn, (req, res) => {
    Task.find()
        .then(tasks => {
            console.log(tasks);
            res.render('tasks/tasklist', { tasks })
        }
        )
        .catch(err => console.log(err));
})
app.get("/tasks/addtask", (req, res) => {
    res.render('tasks/addtask');
})
app.post("/tasks/addtask", (req, res) => {
    console.log(req.body)
    const task = new Task({
        author: "Nada",
        title: req.body.title,
        selected: "Hamdy",
        description: req.body.description
    });
    task.save()
        .then((result) => {
            res.redirect('/tasks/tasklist');
        })
        .catch((err) => {
            console.log(err);
        })
})

// signup
app.get('/register', (req, res) => {
    res.render('register');
})
app.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,
    (err, user)=>{
        if(err){
            console.log(err)
            return res.render('register');
        }
        passport.authenticate('local')(req, res, ()=>{
            res.redirect("/");
        });
    });
});

// login
app.get('/login', (req, res) => {
    console.log(req.user);

    res.render('login');
})
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

// logout
app.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
})