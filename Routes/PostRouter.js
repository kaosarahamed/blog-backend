const express = require("express");
const app = express();
const router = express.Router();
const {getAllPosts, createPost, getSinglePost, updatePost, deletePost, comment} = require("../Controller/PostController");
const postBanner = require("../Middlewares/PostBanner");

router.get("/", getAllPosts);
router.post("/", postBanner, createPost);
router.get("/:id", getSinglePost);
router.patch("/:id", postBanner, updatePost);
router.delete("/:id", deletePost);
router.put("/comment", comment);




module.exports = router;