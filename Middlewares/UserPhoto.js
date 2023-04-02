const multer = require("multer");
let storage = multer.diskStorage({
    destination:'./public/uploads/', 
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname) 
    }
})

let upload = multer({
   storage: storage,
   fileFilter:(req, file, cb)=>{
    if(
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif'

    ){
        cb(null, true)
    }
    else{
        cb(null, false);
        cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
    }
   }
})

const userPhoto = upload.fields([{name : "userlogo", maxCount : 1}])

module.exports = userPhoto;