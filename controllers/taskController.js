// task_index task_add_get, task_add_post
const 
    Task = require('../models/task'),
    task_index = (req, res) => {
        Task.find()
            .then(tasks => {
                res.render('tasks/tasklist', { tasks })
            })
            .catch(err => console.log(err));

    },
    task_add_get = (req, res) => {
        res.render('tasks/addtask');
    },
    task_add_post = (req, res) => {
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
    };

module.exports = {
    task_add_get,
    task_add_post,
    task_index
}
