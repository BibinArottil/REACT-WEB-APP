const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true, "Email is required"]
    },
    password: {
        type: String,
        required:[true, "password is required"]
    }
})

const admin = mongoose.model("Admin", adminSchema);

module.exports=admin