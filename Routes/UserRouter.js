const express = require("express");
const app = express();
const router = express.Router();
const {getAllUser, registerUser, loginUser, updateUser, deleteUser, verifyUser, getOneUser} = require("../Controller/UserController");
const userPhoto = require("../Middlewares/UserPhoto");

router.get("/", getAllUser);
router.post("/singup", userPhoto, registerUser);
router.get("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/:id", getOneUser);
router.patch("/:id", userPhoto, updateUser);
router.delete("/:id", deleteUser);



module.exports = router;