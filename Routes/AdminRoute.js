const express = require("express");
const AdminMedia = require("../Middlewares/AdminMedia");
const app = express();
const router = express.Router();
const {getAdminData, postAdminData, editAdminData, deleteAdminData} = require("../Controller/AdminController");

router.get("/", getAdminData);
router.post("/", AdminMedia, postAdminData);
router.patch("/:id", AdminMedia, editAdminData);
router.delete("/:id", deleteAdminData);



module.exports = router;