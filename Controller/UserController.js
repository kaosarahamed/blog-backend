require("dotenv").config(); 
const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD=process.env.PASSWORD;
const { model } = require("mongoose");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");


// Get All User Data
const getAllUser = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
};
// Register New User
const registerUser = async (req, res) => {
    const logoInput = () => {
        if (req.files?.userlogo?.[0].path === undefined) {
          return null;
        } else {
          return req.files.userlogo[0].path;
        }
      };
   const {username, email, password, confirmpassword, userlogo} = req.body;
   try {
    const existUser = await userModel.findOne({ email : email });
    if(existUser){
        return res.status(400).json({ message : "user already exist" });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = new userModel({
            username : username,
            email : email,
            password : hash,
            confirmpassword : hash,
            userlogo : logoInput(),
            userValid : false,
        });
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);
        let config = {
            service : "gmail",
            auth : {
                user : EMAIL,
                pass : PASSWORD,
            }
        }
        let transporter = nodemailer.createTransport(config);
    
        let mailGenerator = new Mailgen({
            theme : "salted",
            product : {
                name : "Kaosar Theory",
                link : "https://kaosarahamed.online"
            }
        });
        let response = {
            body : {
                name : "Kaocar Ahamed",
                intro : "Email Varification",
                table : {
                    data : [
                        {
                            verify : `Hi ${username} please click here to <a href=http://localhost:4000/user/verify?id=${newUser._id}>verify</a> your mail`,
                        }
                    ]
                },
                outro : "Thanks for registration"
            }
        }
        let mail = mailGenerator.generate(response);
        let message = {
            from : EMAIL,
            to : email,
            subject : "Email Varification",
            html: mail
        }
        await newUser.save();
        transporter.sendMail(message).then(() => {
            return res.status(200).json({newUser : newUser, token : "Bearer " + token, message : "User create successful, Email send" })
        }).catch((err) => {
            return res.status(500).json(err);
        })
      });

   } catch (error) {
    res.status(500).json({ message : "user create faild" });
   }
};
// Login User
const loginUser = async (req, res) => {
    const {email, password, ConfirmPassword} = req.body;
    try {
        const existinguser = await userModel.findOne({ email: email });
    if (!existinguser) {
      return res.status(404).json({ message: "user not found" });
    }
    const matchpassword = await bcrypt.compare(password, existinguser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "incorrect Password" });
    }

    const token = jwt.sign(
        { email: existinguser.email, id: existinguser._id },
        SECRET_KEY
      );
      res.status(201).json({ user: existinguser, token: token, message : "User login successful, Redirecting" });

    } catch (error) {
        res.status(500).json({ message: "User login faild" });
    }

};
// Verify User
const verifyUser = async (req, res) => {
    try {
        await userModel.updateOne({_id : req.query.id}, {$set: {userValid : true}});
        res.status(200).send("<h1>Email Varifyed successful</h1>");
    } catch (error) {
        res.status(500).json({ message : "email Varifyed Unsuccessful" })
    }
}
// Get Single User
const getOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const oneUser = await userModel.findOne({_id : id})
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
// Update User
const updateUser = async (req, res) => {
    const {username, email, password, ConfirmPassword, userlogo} = req.body;
    const logoInput = () => {
        if (req.files?.userlogo?.[0].path === undefined) {
          return null;
        } else {
          return req.files.userlogo[0].path;
        }
      };
    const id = req.params.id;
    try {
        bcrypt.hash(password, 10, async function (err, hash) {
            const newUser = {
                username : username,
                email : email,
                password : hash,
                confirmpassword : hash,
                userlogo : logoInput(),
                userValid : true,
            }
            await userModel.findByIdAndUpdate(id, newUser, {new : true});
        res.status(200).json({ message : "User update successful"})
        })
        
    } catch (error) {
        res.status(500).json({message : "User update faild"})
    }
};
// Delete User
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      const Users = await userModel.findByIdAndRemove(id);
      res.status(200).json({ message: "User delete successful" });
    } catch (error) {
      res.status(500).json({ message: "User delete faild!" });
    }
};

module.exports = {getAllUser, registerUser, loginUser, updateUser, deleteUser, verifyUser, getOneUser};