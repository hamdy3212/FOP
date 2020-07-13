const   express  = require('express'),
        app      = express(),
        mongoose = require('mongoose'),
        Task     = require('./models/task');
// register view engine
app.set('view engine', 'ejs');

// middleware and static folies
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true}));

// connect to DB
mongoose.connect('mongodb://localhost:27017/FOP', {useNewUrlParser: true, useUnifiedTopology: true})
.then( result => app.listen(3000) )
.catch( err => console.log(err) )

app.get("/", (req, res)=>{
    res.render('index');
})
app.get("/tasks/tasklist", (req, res)=>{
    Task.find()
    .then( tasks => {
        console.log(tasks);
        res.render('tasks/tasklist', {tasks})}
        )
    .catch( err => console.log(err));
})
app.get("/tasks/addtask", (req, res)=>{
    res.render('tasks/addtask');
})
app.post("/tasks/addtask", (req, res)=>{
    console.log(req.body)
    const task = new Task({
        author: "Nada",
        title: req.body.title,
        selected: "Hamdy",
        description: req.body.description
    });
    task.save()
    .then((result)=>{
        res.redirect('/tasks/tasklist');
    })
    .catch((err)=>{
        console.log(err);
    })
})