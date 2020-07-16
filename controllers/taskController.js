// task_index, task_add_get, task_add_post
const
    Task = require('../models/task'),
    User = require('../models/user'),
    task_data = (req, res) => {
        User.findById(req.user._id)
            .populate('takenTasks')
            .exec((err, tasks) => {
                if (err) return console.log(err);
                const t = tasks.takenTasks;
                res.send(t);
            });
    },
    task_add_get = (req, res) => {
        User.find().exec((err, users) => {
            if (err) return console.log(err);
            res.render('tasks/addtask', { users });
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
                await selectedUser.takenTasks.push(result);
                await selectedUser.save();
                res.redirect('/tasks/tasklist');
            })
            .catch((err) => {
                console.log(err);
            });

    },
    task_editStatus_put = (req, res) => {
        if (req.body.status == "pending") {
            Task.findByIdAndUpdate(req.body._id, { status: "done" }, { new: true }, (err, updated) => {
                if (err) return console.log(err)

            })
        } else {
            Task.findByIdAndUpdate(req.body._id, { status: "pending" }, { new: true }, (err, updated) => {
                if (err) return console.log(err)

            })
        }
    }

module.exports = {
    task_add_get,
    task_add_post,
    task_data,
    task_editStatus_put
}
