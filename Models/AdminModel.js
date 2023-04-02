const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
    adminname : {
        type : String,
        required : true,
    },
    adminlogo : {
        type : String,
        required : true,
    },
    adminPic : {
        type : String,
        required : true,
    },
    about: {
        type: String,
        required: true
    },
    facebook : {
        type : String,
        required: true
    },
    twitter : {
        type : String,
        required: true
    },
    linkedin : {
        type : String,
        required: true
    },
    instagram : {
        type : String,
        required: true
    },
    youtube : {
        type : String,
        required: true
    },
    copytext : {
        type: String,
        required: true
    },
    footerText : {
        type: String,
        required: true
    }
},
{timestamps : true}
);

module.exports = mongoose.model("AdminSchema", AdminSchema);