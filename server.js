const   express  = require('express'),
        app      = express();


app.set('view engine', 'ejs')
app.get("/", (req, res)=>{
    res.render('index');
})
app.get("/tasks/tasklist", (req, res)=>{
    res.render('tasks/tasklist');
})

app.listen(3000)