const express = require("express");
const app = express();
const router = express.Router();
const {registerAuthor, loginAuthor} = require("../Controller/AuthorController");

router.post("/register", registerAuthor);
router.post("/login", loginAuthor);



module.exports = router;