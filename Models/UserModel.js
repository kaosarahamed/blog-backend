const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        uniqe : true
    },
    email : {
        type : String,
        required : true,
        uniqe : true
    },
    password : {
        type : String,
        required : true,
    },
    confirmpassword : {
        type : String,
        required : true,
    },
    userlogo : {
        type : String,
        required : true
    },
    userValid : {
        type : Boolean,
    }
},
{timestamps : true}
);

module.exports = mongoose.model("userschema", userSchema);