const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    comment : {
        type : String,
        required : true,
    },
    userPic : {
        type : String,
        required : true,
    },
    postId: {
        type: String,
    },
    date: {
        type: String,
    },
},
{timestamps : true}
);

module.exports = mongoose.model("commentSchema", commentSchema);