const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const User = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    branch: String,
    committee: String,
    degree: String,
    position: String,
    profilePicture: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],

})
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
