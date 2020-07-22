// task_index, task_add_get, task_add_post
const
    Task = require('../models/task'),
    User = require('../models/user'),
    takenTasks_get = (req, res) => {
        User.findById(req.user._id)
            .populate('tasks')
            .exec((err, populatedTasks) => {
                if (err) return console.log(err);
                const tasks = populatedTasks.tasks;
                res.json(tasks);
            });
    },
    givenTasks_get = (req, res) => {
        Task.find()
            .exec((err, tasks) => {
                if (err) return console.log(err);
                const givenTasks = [];
                for (const task of tasks) {
                    if (task.author.id.equals(req.user._id)) {
                        givenTasks.push(task);
                    }
                }
                res.json(givenTasks);
            });
    },
    task_add_get = (req, res) => {
        User.find()
            .exec((err, users) => {
                if (err) return console.log(err);
                res.render('tasks/newTask', { users });
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
            },
            status: "pending"
        });
        task.save()
            .then(async (result) => {
                const selectedUser = await User.findOne({ username: data.assignee });
                await selectedUser.tasks.push(result);
                await selectedUser.save();
                res.redirect('/tasks/takenTasks');
            })
            .catch((err) => {
                console.log(err);
            });

    },
    task_editStatus_put = (req, res) => {
        if (req.body.status == "pending") {
            Task.findByIdAndUpdate(req.body._id,
                { status: "done" },
                { new: true },
                (err, updated) => {
                    if (err) return console.log(err)
                })
        } else {
            Task.findByIdAndUpdate(req.body._id,
                { status: "pending" },
                { new: true },
                (err, updated) => {
                    if (err) return console.log(err)
                })
        }
    }

module.exports = {
    task_add_get,
    task_add_post,
    takenTasks_get,
    givenTasks_get,
    task_editStatus_put
}
