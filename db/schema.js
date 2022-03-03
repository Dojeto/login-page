const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userid : mongoose.SchemaTypes.ObjectId
})

const Register = mongoose.model('Dojeto', RegisterSchema);

module.exports = Register;