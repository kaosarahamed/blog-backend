const express = require("express");
const app = express();
const cors = require("cors");
const UserRouter = require("./Routes/UserRouter");
const PostRouter = require("./Routes/PostRouter");
const AdminRoute = require("./Routes/AdminRoute");
const CommentRoute = require("./Routes/CommentRoute");
const AuthorRoute = require("./Routes/AuthorRoute");
const path = require("path");
const bodyParser = require("body-parser");
require("./Config/DBConnection");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use("/user", UserRouter);
app.use("/post", PostRouter);
app.use("/admin", AdminRoute);
app.use("/comment", CommentRoute);
app.use("/author", AuthorRoute);
app.use(express.static(path.join(__dirname, './public/')));





// Home Route
app.get("/", (req, res) => {
    res.send("home route")
});

// Route Not Found
app.use((req, res, next) => {
    res.send("Route Not Found")
});

// Server Error
app.use((req, res, next, err) => {
    if(err){
        return err;
    }else{
        res.send("Server Error")
    }
});



module.exports = app;