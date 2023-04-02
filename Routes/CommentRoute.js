const express = require("express");
const app = express();
const router = express.Router();
const {getUserCOmment, postComment, deleteComment, getAllComment, getsingleComment, updateComment} = require("../Controller/CommentController");
const CommentPic = require("../Middlewares/CommentPic");

router.get("/", getAllComment);
router.get("/:id", getUserCOmment);
router.get("/single/:id", getsingleComment);
router.post("/", postComment);
router.patch("/:id", CommentPic, updateComment);
router.delete("/delete/:id", deleteComment);




module.exports = router;