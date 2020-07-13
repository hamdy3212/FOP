const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = new Schema({
    author: String,
    title: String,
    selected: String,
    description: String,
},
    { timestamps: true });
module.exports = mongoose.model('task', Task);