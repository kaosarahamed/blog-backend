const mongoose = require("mongoose");
const AuthorModel = mongoose.Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("AuthorModel", AuthorModel)