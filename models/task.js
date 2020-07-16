const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = new Schema({
    title       : String,
    assignee    : String,
    description : String,
    deadline    : Date,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    status: String
},
    { timestamps: true });
module.exports = mongoose.model('Task', Task);