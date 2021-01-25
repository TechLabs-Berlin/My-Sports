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
    lastName: {
        type: String
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
    },
    aboutMe: {
        type: String,
    },
    accountConfirmed: {
        type: Boolean,
        default: true
    },
    volleyballRating: {
        type: Number,
        default: 0
    },
    basketballRating: {
        type: Number,
        default: 0
    },
    footballRating: {
        type: Number,
        default: 0
    },
    boulderingRating: {
        type: Number,
        default: 0
    },
    yogaRating: {
        type: Number,
        default: 0
    },
    volleyballRating: {
        type: Number,
        default: 0
    },
    pingpongRating: {
        type: Number,
        default: 0
    },
    runningRating: {
        type: Number,
        default: 0
    }
})
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
