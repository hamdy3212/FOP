const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    author: String,
    title: String,
    selected: String,
    description: String,
},
    { timestamps: true });
const Task = mongoose.model('task', taskSchema);
module.exports = Task;