const   express        = require('express'),
        app            = express(),
        mongoose       = require('mongoose'),
        User           = require('./models/user'),
        passport       = require('passport'),
        LocalStrategy  = require('passport-local'),
        taskRoutes     = require('./routes/tasks'),
        indexRoutes    = require('./routes/index');


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
    }else{
        res.redirect('/login');
    }
}


app.get("/", isLoggedIn, (req, res) => {
    res.render('index');
})

// task routes
app.use('/tasks', isLoggedIn, taskRoutes)

// user
app.use(indexRoutes)