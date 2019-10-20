let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id: Number,
        username: String,
        usermail: String,
        displayname: String,
        avatar_link: String,
        password: String
    },
    { collection: 'users' }
);

module.exports = mongoose.model('Users', userSchema, 'users');