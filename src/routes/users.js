let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id: Number,
        username: String,
        usermail: String,
        displayname: String,
        password: String,
        avatar_link: String
    },
    { collection: 'users' }
);

module.exports = mongoose.model('Users', userSchema);