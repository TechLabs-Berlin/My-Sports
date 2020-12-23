const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
        unique: true
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    dob: {
        type: Date,
        required: 'DOB required'
    },
    gender: {
        type: String,
        required: 'Gender is required'
    },
    location: {
        type: String,
        required: 'Location is required'
    }
})
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;