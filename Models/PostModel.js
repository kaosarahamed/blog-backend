const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    categories : {
        type : Array,
        required : true,
    },
    postbanner : {
        type : String,
        required : true
    },
    createdDate: {
        type: Date
    }
},
{timestamps : true}
);

module.exports = mongoose.model("postSchema", postSchema);