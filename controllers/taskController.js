// task_index, task_add_get, task_add_post
const
    Task = require('../models/task'),
    User = require('../models/user'),
    task_index = (req, res) => {
        User.findById(req.user._id)
            .populate('takenTasks')
            .exec((err, tasks) => {
                if (err) return console.log(err);
                res.render('tasks/tasklist', { tasks: tasks.takenTasks });
            });
    },
    task_add_get = (req, res) => {
        User.find().exec((err, users)=>{
            if(err) return console.log(err);
            res.render('tasks/addtask', {users});
        })
    },
    task_add_post = (req, res) => {
        const data = req.body;
        const task = new Task({
            title: data.title,
            assignee: data.assignee,
            description: data.description,
            deadline: data.deadline,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        });
        task.save()
            .then(async (result) => {
                const selectedUser = await User.findOne({ username: data.assignee });
                await selectedUser.takenTasks.push(result);
                await selectedUser.save();
                res.redirect('/tasks/tasklist');
            })
            .catch((err) => {
                console.log(err);
            });

    };

module.exports = {
    task_add_get,
    task_add_post,
    task_index
}
