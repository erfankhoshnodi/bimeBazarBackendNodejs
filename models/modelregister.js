var mongoose = require('mongoose')
var Register = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true
    },
    dateOfRegistration: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('register', Register)