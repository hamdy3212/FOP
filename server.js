const   express  = require('express'),
        app      = express();

// register view engine
app.set('view engine', 'ejs');

// middleware and static folies
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true}));
const tasks = [];


app.get("/", (req, res)=>{
    res.render('index');
})
app.get("/tasks/tasklist", (req, res)=>{
    res.render('tasks/tasklist', {tasks});
})
app.get("/tasks/addtask", (req, res)=>{
    res.render('tasks/addtask');
})
app.post("/tasks/addtask", (req, res)=>{
    const taskname = req.body.taskname;
    res.redirect('/tasks/addtask');
    tasks.push(taskname);
    console.log(tasks);
})
app.listen(3000)